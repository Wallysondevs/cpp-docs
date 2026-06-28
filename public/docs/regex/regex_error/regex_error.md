# std::regex_error::regex_error

Definido no cabeçalho `[<regex>](<#/doc/header/regex>)`

```c
regex_error( std::regex_constants::error_type ecode );
regex_error( const regex_error& other );
```

1) Constrói um `regex_error` com um `ecode` dado do tipo [std::regex_constants::error_type](<#/doc/regex/error_type>).

2) Construtor de cópia. Inicializa o conteúdo com o de `other`. Se `*this` e `other` ambos tiverem o tipo dinâmico `std::regex_error`, então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0.

### Parâmetros

- **ecode** — código de erro indicando o erro levantado na análise de expressão regular
- **other** — outro objeto `regex_error` para copiar

### Veja também

[ error_type](<#/doc/regex/error_type>)(C++11) | descreve diferentes tipos de erros de correspondência
(typedef)