import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Shared Components
interface InputOutputProps {
  input?: string;
  output: string;
  onInputChange?: (value: string) => void;
  inputPlaceholder?: string;
  outputLabel?: string;
  inputLabel?: string;
  readOnly?: boolean;
  rows?: number;
}

const InputOutput = ({
  input,
  output,
  onInputChange,
  inputPlaceholder = "Enter text...",
  outputLabel = "Output",
  inputLabel = "Input",
  readOnly = false,
  rows = 4
}: InputOutputProps) => (
  <>
    {input !== undefined && onInputChange && (
      <div>
        <label className="block text-sm font-medium text-primary-300 mb-2">{inputLabel}</label>
        <textarea
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder={inputPlaceholder}
          rows={rows}
          className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-gray-200 focus:outline-none focus:border-primary-500 font-mono text-sm"
        />
      </div>
    )}
    <div>
      <label className="block text-sm font-medium text-primary-300 mb-2">{outputLabel}</label>
      <textarea
        value={output}
        readOnly={readOnly}
        rows={rows}
        className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-gray-200 focus:outline-none focus:border-primary-500 font-mono text-sm cursor-pointer"
        onClick={(e) => {
          const target = e.target as HTMLTextAreaElement;
          target.select();
          navigator.clipboard.writeText(output);
        }}
      />
      <p className="text-xs text-gray-500 mt-1">Click to copy</p>
    </div>
  </>
);

// Home Component
const Home = () => {
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowArrow(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="text-center max-w-2xl px-8">
        <div className="mb-8">
          <h1 className="text-5xl font-bold gradient-text mb-4">Developer Utilities</h1>
          <p className="text-xl text-gray-400">
            A collection of handy tools to make your development workflow easier
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-gray-900 border border-primary-700 rounded-lg p-4">
            <div className="text-3xl mb-2">🆔</div>
            <div className="text-sm text-gray-300">UUID Generator</div>
          </div>
          <div className="bg-gray-900 border border-primary-700 rounded-lg p-4">
            <div className="text-3xl mb-2">📝</div>
            <div className="text-sm text-gray-300">JSON Tools</div>
          </div>
          <div className="bg-gray-900 border border-primary-700 rounded-lg p-4">
            <div className="text-3xl mb-2">🔐</div>
            <div className="text-sm text-gray-300">Encoders</div>
          </div>
          <div className="bg-gray-900 border border-primary-700 rounded-lg p-4">
            <div className="text-3xl mb-2">🌐</div>
            <div className="text-sm text-gray-300">IP Checker</div>
          </div>
        </div>

        {showArrow && (
          <div className="flex items-center justify-center gap-4 animate-pulse">
            <div className="text-primary-400 text-lg">
              ← Select a tool from the sidebar to get started
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// UUID Generator Component
const UUIDGenerator = () => {
  const [uuidVersion, setUuidVersion] = useState<'v4' | 'v7'>('v4');
  const [uuid, setUuid] = useState('');

  const generateUUID = () => {
    if (uuidVersion === 'v4') {
      const uuid = crypto.randomUUID();
      setUuid(uuid);
    } else {
      const timestamp = Date.now();
      const randomBytes = crypto.getRandomValues(new Uint8Array(10));
      const timestampHex = timestamp.toString(16).padStart(12, '0');
      const randomHex = Array.from(randomBytes)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      const uuidV7 = `${timestampHex.slice(0, 8)}-${timestampHex.slice(8, 12)}-7${randomHex.slice(0, 3)}-${randomHex.slice(3, 7)}-${randomHex.slice(7, 19)}`;
      setUuid(uuidV7);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-primary-400 mb-2">UUID Generator</h2>
        <p className="text-gray-400">Generate universally unique identifiers (UUID v4 or v7)</p>
      </div>

      <div className="bg-gray-900 border border-primary-700 rounded-lg p-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="v4"
                checked={uuidVersion === 'v4'}
                onChange={(e) => setUuidVersion(e.target.value as 'v4')}
                className="text-primary-500"
              />
              <span className="text-gray-300">UUID v4 (Random)</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="v7"
                checked={uuidVersion === 'v7'}
                onChange={(e) => setUuidVersion(e.target.value as 'v7')}
                className="text-primary-500"
              />
              <span className="text-gray-300">UUID v7 (Timestamp)</span>
            </label>
          </div>
          <button
            onClick={generateUUID}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded transition-colors"
          >
            Generate UUID
          </button>
          {uuid && (
            <InputOutput
              output={uuid}
              outputLabel={`UUID ${uuidVersion.toUpperCase()}`}
              readOnly
              rows={2}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// JSON Generator Component
const JSONGenerator = () => {
  const [jsonSchema, setJsonSchema] = useState(`{
  "name": "string",
  "age": "number",
  "email": "email",
  "isActive": "boolean",
  "address": {
    "street": "string",
    "city": "string",
    "zipCode": "string"
  },
  "tags": ["string", "string"]
}`);
  const [generatedJson, setGeneratedJson] = useState('');
  const [jsonCount, setJsonCount] = useState(1);

  const generateRandomValue = (type: string): any => {
    switch (type) {
      case 'string':
        return `sample_${Math.random().toString(36).substring(7)}`;
      case 'number':
        return Math.floor(Math.random() * 100);
      case 'boolean':
        return Math.random() > 0.5;
      case 'email':
        return `user${Math.floor(Math.random() * 1000)}@example.com`;
      case 'phone':
        return `+1${Math.floor(Math.random() * 9000000000 + 1000000000)}`;
      case 'url':
        return `https://example.com/${Math.random().toString(36).substring(7)}`;
      case 'date':
        return new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString();
      case 'uuid':
        return crypto.randomUUID();
      default:
        return null;
    }
  };

  const generateJsonFromSchema = (schema: any): any => {
    if (Array.isArray(schema)) {
      return schema.map(item => {
        if (typeof item === 'string') {
          return generateRandomValue(item);
        }
        return generateJsonFromSchema(item);
      });
    }

    if (typeof schema === 'object' && schema !== null) {
      const result: any = {};
      for (const [key, value] of Object.entries(schema)) {
        if (typeof value === 'string') {
          result[key] = generateRandomValue(value);
        } else {
          result[key] = generateJsonFromSchema(value);
        }
      }
      return result;
    }

    return schema;
  };

  const generateRandomJson = () => {
    try {
      const schema = JSON.parse(jsonSchema);
      const results = [];
      for (let i = 0; i < jsonCount; i++) {
        results.push(generateJsonFromSchema(schema));
      }
      const output = jsonCount === 1 ? results[0] : results;
      setGeneratedJson(JSON.stringify(output, null, 2));
    } catch (error) {
      setGeneratedJson(`Error: Invalid JSON schema - ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-primary-400 mb-2">Random JSON Generator</h2>
        <p className="text-gray-400">Generate random JSON data based on a schema</p>
      </div>

      <div className="bg-gray-900 border border-primary-700 rounded-lg p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary-300 mb-2">
              Schema (JSON format)
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Supported types: string, number, boolean, email, phone, url, date, uuid
            </p>
            <textarea
              value={jsonSchema}
              onChange={(e) => setJsonSchema(e.target.value)}
              rows={10}
              className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-gray-200 focus:outline-none focus:border-primary-500 font-mono text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-300 mb-2">
              Number of objects
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={jsonCount}
              onChange={(e) => setJsonCount(parseInt(e.target.value) || 1)}
              className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-gray-200 focus:outline-none focus:border-primary-500"
            />
          </div>
          <button
            onClick={generateRandomJson}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded transition-colors"
          >
            Generate JSON
          </button>
          {generatedJson && (
            <InputOutput
              output={generatedJson}
              outputLabel="Generated JSON"
              readOnly
              rows={12}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// Base64 Encoder/Decoder
const Base64Tool = () => {
  const [base64Input, setBase64Input] = useState('');
  const [base64Output, setBase64Output] = useState('');
  const [base64Mode, setBase64Mode] = useState<'encode' | 'decode'>('encode');

  const handleBase64 = () => {
    try {
      if (base64Mode === 'encode') {
        setBase64Output(btoa(base64Input));
      } else {
        setBase64Output(atob(base64Input));
      }
    } catch (error) {
      setBase64Output(`Error: ${error instanceof Error ? error.message : 'Invalid input'}`);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-primary-400 mb-2">Base64 Encoder/Decoder</h2>
        <p className="text-gray-400">Encode or decode Base64 strings</p>
      </div>

      <div className="bg-gray-900 border border-primary-700 rounded-lg p-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="encode"
                checked={base64Mode === 'encode'}
                onChange={(e) => setBase64Mode(e.target.value as 'encode')}
                className="text-primary-500"
              />
              <span className="text-gray-300">Encode</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="decode"
                checked={base64Mode === 'decode'}
                onChange={(e) => setBase64Mode(e.target.value as 'decode')}
                className="text-primary-500"
              />
              <span className="text-gray-300">Decode</span>
            </label>
          </div>
          <InputOutput
            input={base64Input}
            onInputChange={setBase64Input}
            output={base64Output}
            inputPlaceholder={base64Mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
            readOnly
          />
          <button
            onClick={handleBase64}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded transition-colors"
          >
            {base64Mode === 'encode' ? 'Encode' : 'Decode'}
          </button>
        </div>
      </div>
    </div>
  );
};

// URL Encoder/Decoder
const URLTool = () => {
  const [urlInput, setUrlInput] = useState('');
  const [urlOutput, setUrlOutput] = useState('');
  const [urlMode, setUrlMode] = useState<'encode' | 'decode'>('encode');

  const handleUrl = () => {
    try {
      if (urlMode === 'encode') {
        setUrlOutput(encodeURIComponent(urlInput));
      } else {
        setUrlOutput(decodeURIComponent(urlInput));
      }
    } catch (error) {
      setUrlOutput(`Error: ${error instanceof Error ? error.message : 'Invalid input'}`);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-primary-400 mb-2">URL Encoder/Decoder</h2>
        <p className="text-gray-400">Encode or decode URL components</p>
      </div>

      <div className="bg-gray-900 border border-primary-700 rounded-lg p-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="encode"
                checked={urlMode === 'encode'}
                onChange={(e) => setUrlMode(e.target.value as 'encode')}
                className="text-primary-500"
              />
              <span className="text-gray-300">Encode</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="decode"
                checked={urlMode === 'decode'}
                onChange={(e) => setUrlMode(e.target.value as 'decode')}
                className="text-primary-500"
              />
              <span className="text-gray-300">Decode</span>
            </label>
          </div>
          <InputOutput
            input={urlInput}
            onInputChange={setUrlInput}
            output={urlOutput}
            inputPlaceholder={urlMode === 'encode' ? 'Enter URL to encode...' : 'Enter encoded URL to decode...'}
            readOnly
          />
          <button
            onClick={handleUrl}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded transition-colors"
          >
            {urlMode === 'encode' ? 'Encode' : 'Decode'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Hash Generator
const HashGenerator = () => {
  const [hashInput, setHashInput] = useState('');
  const [hashOutput, setHashOutput] = useState('');

  const generateHash = async () => {
    if (!hashInput) {
      setHashOutput('');
      return;
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(hashInput);

    try {
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      setHashOutput(hashHex);
    } catch (error) {
      setHashOutput(`Error: ${error instanceof Error ? error.message : 'Hash generation failed'}`);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-primary-400 mb-2">SHA-256 Hash Generator</h2>
        <p className="text-gray-400">Generate SHA-256 hash from text</p>
      </div>

      <div className="bg-gray-900 border border-primary-700 rounded-lg p-6">
        <div className="space-y-4">
          <InputOutput
            input={hashInput}
            onInputChange={setHashInput}
            output={hashOutput}
            inputPlaceholder="Enter text to hash..."
            outputLabel="SHA-256 Hash"
            readOnly
          />
          <button
            onClick={generateHash}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded transition-colors"
          >
            Generate Hash
          </button>
        </div>
      </div>
    </div>
  );
};

// Timestamp Converter
const TimestampConverter = () => {
  const [timestamp, setTimestamp] = useState(Date.now().toString());
  const [timestampDate, setTimestampDate] = useState('');

  const convertTimestamp = () => {
    try {
      const ts = parseInt(timestamp);
      const date = new Date(ts);
      setTimestampDate(date.toISOString() + '\n' + date.toLocaleString());
    } catch (error) {
      setTimestampDate(`Error: Invalid timestamp`);
    }
  };

  const getCurrentTimestamp = () => {
    setTimestamp(Date.now().toString());
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-primary-400 mb-2">Timestamp Converter</h2>
        <p className="text-gray-400">Convert Unix timestamp to readable date</p>
      </div>

      <div className="bg-gray-900 border border-primary-700 rounded-lg p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary-300 mb-2">
              Unix Timestamp (milliseconds)
            </label>
            <input
              type="text"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-gray-200 focus:outline-none focus:border-primary-500 font-mono"
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={convertTimestamp}
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded transition-colors"
            >
              Convert
            </button>
            <button
              onClick={getCurrentTimestamp}
              className="flex-1 bg-secondary-600 hover:bg-secondary-700 text-white font-semibold py-3 px-4 rounded transition-colors"
            >
              Current Time
            </button>
          </div>
          {timestampDate && (
            <InputOutput
              output={timestampDate}
              outputLabel="Converted Date"
              readOnly
              rows={3}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// Color Converter
const ColorConverter = () => {
  const [colorInput, setColorInput] = useState('#b799d4');
  const [colorOutput, setColorOutput] = useState('');

  const convertColor = () => {
    try {
      const hex = colorInput.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);

      const rgb = `rgb(${r}, ${g}, ${b})`;

      const rNorm = r / 255;
      const gNorm = g / 255;
      const bNorm = b / 255;

      const max = Math.max(rNorm, gNorm, bNorm);
      const min = Math.min(rNorm, gNorm, bNorm);
      let h = 0, s = 0, l = (max + min) / 2;

      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
          case rNorm:
            h = ((gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0)) / 6;
            break;
          case gNorm:
            h = ((bNorm - rNorm) / d + 2) / 6;
            break;
          case bNorm:
            h = ((rNorm - gNorm) / d + 4) / 6;
            break;
        }
      }

      const hsl = `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;

      setColorOutput(`HEX: ${colorInput}\nRGB: ${rgb}\nHSL: ${hsl}`);
    } catch (error) {
      setColorOutput(`Error: Invalid color format`);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-primary-400 mb-2">Color Converter</h2>
        <p className="text-gray-400">Convert HEX color to RGB and HSL</p>
      </div>

      <div className="bg-gray-900 border border-primary-700 rounded-lg p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary-300 mb-2">
              HEX Color
            </label>
            <div className="flex space-x-2">
              <input
                type="color"
                value={colorInput}
                onChange={(e) => setColorInput(e.target.value)}
                className="h-12 w-16 bg-gray-800 border border-gray-700 rounded cursor-pointer"
              />
              <input
                type="text"
                value={colorInput}
                onChange={(e) => setColorInput(e.target.value)}
                className="flex-1 bg-gray-800 border border-gray-700 rounded px-4 py-2 text-gray-200 focus:outline-none focus:border-primary-500 font-mono"
                placeholder="#b799d4"
              />
            </div>
          </div>
          <button
            onClick={convertColor}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded transition-colors"
          >
            Convert
          </button>
          {colorOutput && (
            <InputOutput
              output={colorOutput}
              outputLabel="Color Values"
              readOnly
              rows={4}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// Lorem Ipsum Generator
const LoremIpsumGenerator = () => {
  const [paragraphs, setParagraphs] = useState(3);
  const [loremText, setLoremText] = useState('');

  const loremParagraphs = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
    "Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
    "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus."
  ];

  const generateLorem = () => {
    const selectedParagraphs = [];
    for (let i = 0; i < paragraphs; i++) {
      selectedParagraphs.push(loremParagraphs[i % loremParagraphs.length]);
    }
    setLoremText(selectedParagraphs.join('\n\n'));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-primary-400 mb-2">Lorem Ipsum Generator</h2>
        <p className="text-gray-400">Generate placeholder text</p>
      </div>

      <div className="bg-gray-900 border border-primary-700 rounded-lg p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary-300 mb-2">
              Number of Paragraphs
            </label>
            <input
              type="number"
              min="1"
              max="20"
              value={paragraphs}
              onChange={(e) => setParagraphs(parseInt(e.target.value) || 1)}
              className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-gray-200 focus:outline-none focus:border-primary-500"
            />
          </div>
          <button
            onClick={generateLorem}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded transition-colors"
          >
            Generate Lorem Ipsum
          </button>
          {loremText && (
            <InputOutput
              output={loremText}
              outputLabel="Generated Text"
              readOnly
              rows={10}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// IP Address Checker
const IPChecker = () => {
  const [ipData, setIpData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const checkIP = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();

      // Get more detailed info
      const detailResponse = await fetch(`https://ipapi.co/${data.ip}/json/`);
      const detailData = await detailResponse.json();

      setIpData(detailData);
    } catch (err) {
      setError('Failed to fetch IP information');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-primary-400 mb-2">IP Address Checker</h2>
        <p className="text-gray-400">Check your public IP address and location</p>
      </div>

      <div className="bg-gray-900 border border-primary-700 rounded-lg p-6">
        <div className="space-y-4">
          <button
            onClick={checkIP}
            disabled={loading}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded transition-colors disabled:opacity-50"
          >
            {loading ? 'Checking...' : 'Check My IP'}
          </button>

          {error && (
            <div className="bg-red-900/20 border border-red-700 rounded px-4 py-3 text-red-400">
              {error}
            </div>
          )}

          {ipData && (
            <div className="space-y-3">
              <div className="bg-gray-800 border border-gray-700 rounded p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">IP Address</div>
                    <div className="text-lg font-mono text-primary-300">{ipData.ip}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Version</div>
                    <div className="text-lg font-mono text-primary-300">{ipData.version}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">City</div>
                    <div className="text-lg text-gray-200">{ipData.city || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Region</div>
                    <div className="text-lg text-gray-200">{ipData.region || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Country</div>
                    <div className="text-lg text-gray-200">{ipData.country_name || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Timezone</div>
                    <div className="text-lg text-gray-200">{ipData.timezone || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">ISP</div>
                    <div className="text-lg text-gray-200">{ipData.org || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Latitude / Longitude</div>
                    <div className="text-sm font-mono text-gray-200">
                      {ipData.latitude}, {ipData.longitude}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded p-4">
                <div className="text-sm text-gray-500 mb-2">Full JSON Response</div>
                <textarea
                  value={JSON.stringify(ipData, null, 2)}
                  readOnly
                  rows={8}
                  className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-gray-200 focus:outline-none focus:border-primary-500 font-mono text-xs cursor-pointer"
                  onClick={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.select();
                    navigator.clipboard.writeText(JSON.stringify(ipData, null, 2));
                  }}
                />
                <p className="text-xs text-gray-500 mt-1">Click to copy</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Utils Component
const Utils = () => {
  const [selectedTool, setSelectedTool] = useState<string>('home');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const tools = [
    { id: 'home', name: 'Home', icon: '🏠' },
    { id: 'uuid', name: 'UUID Generator', icon: '🆔' },
    { id: 'json', name: 'JSON Generator', icon: '📝' },
    { id: 'base64', name: 'Base64', icon: '🔐' },
    { id: 'url', name: 'URL Encoder', icon: '🔗' },
    { id: 'hash', name: 'Hash Generator', icon: '#️⃣' },
    { id: 'timestamp', name: 'Timestamp', icon: '⏰' },
    { id: 'color', name: 'Color Converter', icon: '🎨' },
    { id: 'lorem', name: 'Lorem Ipsum', icon: '📄' },
    { id: 'ip', name: 'IP Checker', icon: '🌐' },
  ];

  const renderTool = () => {
    switch (selectedTool) {
      case 'home':
        return <Home />;
      case 'uuid':
        return <UUIDGenerator />;
      case 'json':
        return <JSONGenerator />;
      case 'base64':
        return <Base64Tool />;
      case 'url':
        return <URLTool />;
      case 'hash':
        return <HashGenerator />;
      case 'timestamp':
        return <TimestampConverter />;
      case 'color':
        return <ColorConverter />;
      case 'lorem':
        return <LoremIpsumGenerator />;
      case 'ip':
        return <IPChecker />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 flex flex-col">
      {/* Header */}
      <header className="bg-gray-900 border-b border-primary-700 sticky top-0 z-20">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-primary-400 hover:text-primary-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link to="/" className="text-primary-400 hover:text-primary-300 transition-colors flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Terminal</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-10 w-64 bg-gray-900 border-r border-primary-700 transition-transform duration-300 ease-in-out overflow-y-auto`}
          style={{ top: '73px' }}
        >
          <nav className="p-4 space-y-2">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => {
                  setSelectedTool(tool.id);
                  if (window.innerWidth < 1024) {
                    setSidebarOpen(false);
                  }
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  selectedTool === tool.id
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-primary-400'
                }`}
              >
                <span className="text-xl">{tool.icon}</span>
                <span className="font-medium">{tool.name}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            {renderTool()}
          </div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-0"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Utils;
