# std::runtime_format

Definido no cabeçalho `[<format>](<#/doc/header/format>)`

```c
/*runtime-format-string*/<char> runtime_format( std::string_view fmt ) noexcept;
/*runtime-format-string*/<wchar_t> runtime_format( std::wstring_view fmt ) noexcept;
```

Retorna um objeto que armazena uma string de formato em tempo de execução diretamente utilizável em funções de formatação orientadas ao usuário e que pode ser implicitamente convertido para [`std::basic_format_string`](<#/doc/utility/format/basic_format_string>).

### Parâmetros

- **fmt** — uma string view

### Valor de retorno

Um objeto contendo a string de formato em tempo de execução do tipo apenas para exposição:

## **Modelo de classe** `_runtime-format-string_` `<CharT>`

```cpp
template< class CharT >
struct /*runtime-format-string*/;  // (apenas para exposição*)
```

#### Membros de dados

O objeto retornado contém um membro de dados não estático apenas para exposição `_str_` do tipo std::basic_string_view&lt;CharT&gt;.

#### Construtores e atribuições

```cpp
/*runtime-format-string*/( std::basic_string_view<CharT> s ) noexcept;  // (1)
/*runtime-format-string*/( const /*runtime-format-string*/& ) = delete;  // (2)
/*runtime-format-string*/& operator=( const /*runtime-format-string*/& ) = delete;  // (3)
```

1) Inicializa `_str_` com `s`.

2) O construtor de cópia é explicitamente deletado. O tipo não é copiável nem movível.

3) A atribuição é explicitamente deletada.

### Observações

Como o tipo de retorno de `runtime_format` não é copiável nem movível, uma tentativa de passar runtime_fmt como glvalue inibe a construção de std::basic_format_string, o que resulta em um programa malformado. Para construir `std::basic_format_string` com `runtime_format`, o valor retornado de `runtime_format` é passado diretamente para `std::basic_format_string` como prvalue, onde a elisão de cópia é garantida.
```
    auto runtime_fmt = std::runtime_format("{}");
    
    auto s0 = std::format(runtime_fmt, 1); // erro
    auto s1 = std::format(std::move(runtime_fmt), 1); // ainda erro
    auto s2 = std::format(std::runtime_format("{}"), 1); // ok
```

Macro de [teste de funcionalidade](<#/doc/utility/feature_test>) | Valor | Padrão | Funcionalidade
---|---|---|---
[`__cpp_lib_format`](<#/doc/feature_test>) | [`202311L`](<#/>) | (C++26) | Strings de formato em tempo de execução

### Exemplo

Execute este código
```
    #include <format>
    #include <print>
    #include <string>
    #include <string_view>
    
    int main()
    {
        std::print("Hello {}!\n", "world");
    
        std::string fmt;
        for (int i{}; i != 3; ++i)
        {
            fmt += "{} "; // constructs the formatting string
            std::print("{} : ", fmt);
            std::println(std::runtime_format(fmt), "alpha", 'Z', 3.14, "unused");
        }
    }
```

Saída:
```
    Hello world!
    {} : alpha
    {} {} : alpha Z
    {} {} {} : alpha Z 3.14
```

### Veja também

[ format](<#/doc/utility/format/format>)(C++20) | armazena a representação formatada dos argumentos em uma nova string
(modelo de função)
[ vformat](<#/doc/utility/format/vformat>)(C++20) | variante não-template de [std::format](<#/doc/utility/format/format>) usando representação de argumento com tipo apagado
(função)
[ basic_format_stringformat_stringwformat_string](<#/doc/utility/format/basic_format_string>)(C++20)(C++20)(C++20) | modelo de classe que realiza verificações de string de formato em tempo de compilação no momento da construção
(modelo de classe)