# std::text_encoding::literal

```cpp
static consteval text_encoding literal() noexcept;  // (desde C++26)
```

Constrói um novo objeto `text_encoding` representando a [codificação de literal de caractere comum](<#/doc/language/charset>). É usado para determinar a codificação de caracteres aplicada a literais de caractere ou string comuns (por exemplo, "This is literal").

Esta função é deletada a menos que [CHAR_BIT](<#/doc/types/climits>) seja 8.

### Parâmetros

(nenhum)

### Valor de retorno

O objeto que contém a representação da codificação de literal comum.

### Notas

Esta função pode ser implementada construindo `text_encoding` com macros embutidas específicas do compilador, como [`__clang_literal_encoding__`](<https://clang.llvm.org/docs/LanguageExtensions.html#builtin-macros>) do Clang, ou [`__GNUC_EXECUTION_CHARSET_NAME`](<https://gcc.gnu.org/onlinedocs/cpp/Common-Predefined-Macros.html>) do GCC. Essas macros, que são conhecidas em tempo de compilação, expandem-se para um literal de string estreito contendo o nome do conjunto de caracteres de execução estreito usado (codificação de literal comum).

O valor retornado por literal() pode depender de opções do compilador como `-fexec-charset=_encoding-name_` no GCC ou Clang ou `/execution-charset:_encoding-name_` no MSVC.

### Exemplo

Este exemplo demonstra a asserção de que a codificação de literal comum deve ser UTF-8.

Execute este código
```
    #include <text_encoding>
    
    static_assert(std::text_encoding::literal() == std::text_encoding::UTF8);
    
    int main()
    {
        // se a codificação de literal for UTF-8, então este literal de string sem prefixo é
        // codificado como UTF-8
        constexpr char green_heart[] = "\N{GREEN HEART}";
    
        // este literal de string prefixado é sempre codificado como UTF-8, independentemente da
        // codificação de literal
        constexpr char8_t green_heart_u8[] = u8"\N{GREEN HEART}";
    }
```