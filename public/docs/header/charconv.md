# Cabeçalho da biblioteca padrão &lt;charconv&gt; (C++17)

Este cabeçalho faz parte da biblioteca de [processamento de texto](<#/doc/text>).

### Classes

[ chars_format](<#/doc/utility/chars_format>)(C++17) | especifica a formatação para std::to_chars e std::from_chars
(enum)
[ from_chars_result](<#/doc/utility/from_chars_result>)(C++17) | o tipo de retorno de [`std::from_chars`](<#/doc/utility/from_chars>)
(class)
[ to_chars_result](<#/doc/utility/to_chars_result>)(C++17) | o tipo de retorno de [`std::to_chars`](<#/doc/utility/to_chars>)
(class)

### Funções

[ from_chars](<#/doc/utility/from_chars>)(C++17) | converte uma sequência de caracteres para um valor inteiro ou de ponto flutuante
(function)
[ to_chars](<#/doc/utility/to_chars>)(C++17) | converte um valor inteiro ou de ponto flutuante para uma sequência de caracteres
(function)

### Sinopse
```cpp
    namespace std {
      // formato de ponto flutuante para conversão numérica primitiva
      enum class chars_format {
        scientific = /* unspecified */,
        fixed = /* unspecified */,
        hex = /* unspecified */,
        general = fixed | scientific
      };
    
    
      // conversão numérica primitiva de saída
      struct to_chars_result { // freestanding
        char* ptr;
        errc ec;
        friend bool operator==(const to_chars_result&, const to_chars_result&) = default;
        constexpr explicit operator bool() const noexcept { return ec == errc{}; }
      };
    
      constexpr
      to_chars_result to_chars(char* first, char* last, // freestanding
                               /* integer-type */ value, int base = 10);
      to_chars_result to_chars(char* first, char* last, // freestanding
                               bool value, int base = 10) = delete;
      to_chars_result to_chars(char* first, char* last, // freestanding-deleted
                               /* floating-point-type */ value);
      to_chars_result to_chars(char* first, char* last, // freestanding-deleted
                               /* floating-point-type */ value, chars_format fmt);
      to_chars_result to_chars(char* first, char* last, // freestanding-deleted
                               /* floating-point-type */ value,
                               chars_format fmt, int precision);
    
      // conversão numérica primitiva de entrada
      struct from_chars_result { // freestanding
        const char* ptr;
        errc ec;
        friend bool operator==(const from_chars_result&, const from_chars_result&) = default;
        constexpr explicit operator bool() const noexcept { return ec == errc{}; }
      };
    
      constexpr
      from_chars_result from_chars(const char* first, // freestanding
                                   const char* last, /* integer-type */& value,
                                   int base = 10);
      from_chars_result from_chars(const char* first, // freestanding-deleted
                                   const char* last, /* floating-point-type */& value,
                                   chars_format fmt = chars_format::general);
    }
```