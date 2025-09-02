type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, unknown>;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  private log(level: LogLevel, message: string, context?: Record<string, unknown>) {
    if (!this.isDevelopment && level === 'debug') {
      return;
    }

    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
    };

    switch (level) {
      case 'debug':
        console.debug(`[${entry.timestamp}] DEBUG: ${message}`, context);
        break;
      case 'info':
        console.info(`[${entry.timestamp}] INFO: ${message}`, context);
        break;
      case 'warn':
        console.warn(`[${entry.timestamp}] WARN: ${message}`, context);
        break;
      case 'error':
        console.error(`[${entry.timestamp}] ERROR: ${message}`, context);
        break;
    }

    // In production, you might want to send logs to a service
    if (!this.isDevelopment) {
      this.sendToLogService(entry);
    }
  }

  private sendToLogService(entry: LogEntry) {
    // Implement log service integration here
    // e.g., send to Sentry, LogRocket, etc.
  }

  debug(message: string, context?: Record<string, unknown>) {
    this.log('debug', message, context);
  }

  info(message: string, context?: Record<string, unknown>) {
    this.log('info', message, context);
  }

  warn(message: string, context?: Record<string, unknown>) {
    this.log('warn', message, context);
  }

  error(message: string, error?: Error | unknown, context?: Record<string, unknown>) {
    const errorContext = {
      ...context,
      error: error instanceof Error ? {
        name: error.name,
        message: error.message,
        stack: error.stack,
      } : error,
    };
    this.log('error', message, errorContext);
  }
}

export const logger = new Logger();
