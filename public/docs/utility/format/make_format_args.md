# std::make_format_args, std::make_wformat_args

Definido no cabeçalho `[<format>](<#/doc/header/format>)`

```c
template< class Context = std::format_context, class... Args >
/*format-arg-store*/<Context, Args...>
make_format_args( Args&... args );
template< class... Args >
/*format-arg-store*/<std::wformat_context, Args...>
make_wformat_args( Args&... args );
```

Retorna um objeto que armazena um array de argumentos de formatação e pode ser implicitamente convertido para [std::basic_format_args&lt;Context&gt;](<#/doc/utility/format/basic_format_args>).

O comportamento é indefinido se typename Context::template formatter_type<[std::remove_const_t](<#/doc/types/remove_cv>)&lt;Ti&gt;> não atender aos requisitos de [BasicFormatter](<#/doc/named_req/BasicFormatter>) para qualquer `Ti` em `Args`.

O programa é malformado se para qualquer tipo `Ti` em `Args`, `Ti` não satisfizer [`___formattable_with_`](<#/doc/utility/format/formattable>) &lt;Context&gt;.

2) Equivalente a return std::make_format_args<[std::wformat_context](<#/doc/utility/format/basic_format_context>)>(args...);.

### Parâmetros

args... | \- | valores a serem usados como argumentos de formatação

### Retorna

Um objeto que contém os argumentos de formatação.

Para cada argumento `t` do tipo `T`, seja `TD` [std::remove_const_t](<#/doc/types/remove_cv>)<[std::remove_reference_t](<#/doc/types/remove_reference>)&lt;T&gt;>. O [std::basic_format_arg](<#/doc/utility/format/basic_format_arg>) correspondente no resultado é determinado como segue:

*   se `TD` for bool ou `Context::char_type`, o [std::basic_format_arg](<#/doc/utility/format/basic_format_arg>) armazena t;
*   caso contrário, se `TD` for char e `Context::char_type` for wchar_t, o [std::basic_format_arg](<#/doc/utility/format/basic_format_arg>) armazena static_cast<wchar_t>(static_cast&lt;unsigned char&gt;(t));
*   caso contrário, se `TD` for um tipo inteiro com sinal cujo tamanho não seja maior que int, o [std::basic_format_arg](<#/doc/utility/format/basic_format_arg>) armazena static_cast&lt;int&gt;(t);
*   caso contrário, se `TD` for um tipo inteiro sem sinal cujo tamanho não seja maior que unsigned int, o [std::basic_format_arg](<#/doc/utility/format/basic_format_arg>) armazena static_cast&lt;unsigned int&gt;(t);
*   caso contrário, se `TD` for um tipo inteiro com sinal cujo tamanho não seja maior que long long, o [std::basic_format_arg](<#/doc/utility/format/basic_format_arg>) armazena static_cast&lt;long long&gt;(t);
*   caso contrário, se `TD` for um tipo inteiro sem sinal cujo tamanho não seja maior que unsigned long long, o [std::basic_format_arg](<#/doc/utility/format/basic_format_arg>) armazena static_cast&lt;unsigned long long&gt;(t);
*   caso contrário, se `TD` for float, double ou long double, o [std::basic_format_arg](<#/doc/utility/format/basic_format_arg>) armazena t;
*   caso contrário, se `TD` for uma especialização de [std::basic_string_view](<#/doc/string/basic_string_view>) ou [std::basic_string](<#/doc/string/basic_string>) e `TD::char_type` for `Context::char_type`, o [std::basic_format_arg](<#/doc/utility/format/basic_format_arg>) armazena [std::basic_string_view](<#/doc/string/basic_string_view>)<Context::char_type>(t.data(), t.size());
*   caso contrário, se [std::decay_t](<#/doc/types/decay>)&lt;TD&gt; for Context::char_type* ou const Context::char_type*, o [std::basic_format_arg](<#/doc/utility/format/basic_format_arg>) armazena static_cast&lt;const Context::char_type*&gt;(t);
*   caso contrário, se [std::is_void_v](<#/doc/types/is_void>)<[std::remove_pointer_t](<#/doc/types/remove_pointer>)&lt;TD&gt;> for true ou [std::is_null_pointer_v](<#/doc/types/is_null_pointer>)&lt;TD&gt; for true, o [std::basic_format_arg](<#/doc/utility/format/basic_format_arg>) armazena static_cast&lt;const void*&gt;(t);
*   caso contrário, o [std::basic_format_arg](<#/doc/utility/format/basic_format_arg>) armazena um [std::basic_format_arg](<#/doc/utility/format/basic_format_arg>)&lt;Context&gt;::handle para `t`, juntamente com dados extras necessários para [`handle::format()`](<#/doc/utility/format/basic_format_arg/handle>).

### Notas

Um argumento de formatação possui semântica de referência para tipos definidos pelo usuário e não estende o tempo de vida de args. É responsabilidade do programador garantir que args sobrevivam ao valor de retorno. Geralmente, o resultado é usado apenas como argumento para a função de formatação.

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_format_uchar`](<#/doc/feature_test>) | [`202311L`](<#/>) | (C++20) |
(DR) | Formatação de unidades de código como inteiros sem sinal

### Exemplo

Execute este código
```cpp
    #include <array>
    #include <format>
    #include <iostream>
    #include <string_view>
    
    void raw_write_to_log(std::string_view users_fmt, std::format_args&& args)
    {
        static int n{};
        std::clog << std::format("{:04} : ", n++) << std::vformat(users_fmt, args) << '\n';
    }
    
    template<typename... Args>
    constexpr void log(Args&&... args)
    {
        // Generate formatting string "{} "...
        std::array<char, sizeof...(Args) * 3 + 1> braces{};
        constexpr const char c[4] = "{} ";
        for (auto i{0uz}; i != braces.size() - 1; ++i)
            braces[i] = c[i % 3];
        braces.back() = '\0';
    
        raw_write_to_log(std::string_view{braces.data()}, std::make_format_args(args...));
    }
    
    template<typename T>
    const T& unmove(T&& x)
    {
        return x;
    }
    
    int main()
    {
        log("Number", "of", "arguments", "is", "arbitrary.");
        log("Any type that meets the BasicFormatter requirements", "can be printed.");
        log("For example:", 1, 2.0, '3', "*42*");
    
        raw_write_to_log("{:02} │ {} │ {} │ {}",
                         std::make_format_args(unmove(1), unmove(2.0), unmove('3'), "4"));
    }
```

Saída:
```
    0000 : Number of arguments is arbitrary.
    0001 : Any type that meets the BasicFormatter requirements can be printed.
    0002 : For example: 1 2.0 3 *42*
    0003 : 01 │ 2.0 │ 3 │ 4
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[P2418R2](<https://wg21.link/P2418R2>) | C++20 | objetos que não são nem const-utilizáveis nem copiáveis (como objetos tipo gerador) não são formatáveis | permite formatar esses objetos
[P2905R2](<https://wg21.link/P2905R2>) | C++20 | `make_format_args` aceitava argumentos rvalue por meio de forwarding references | aceita apenas lvalue references
[P2909R4](<https://wg21.link/P2909R4>) | C++20 | char ou wchar_t podem ser formatados como valores inteiros sem sinal fora do intervalo | unidades de código são convertidas para o tipo sem sinal correspondente antes de tal formatação
[LWG 3631](<https://cplusplus.github.io/LWG/issue3631>) | C++20 | argumentos cv-qualified foram tratados incorretamente após P2418R2 | tratamento corrigido

### Veja também

[ basic_format_argsformat_argswformat_args](<#/doc/utility/format/basic_format_args>)(C++20)(C++20)(C++20) | classe que fornece acesso a todos os argumentos de formatação
---|---
(modelo de classe) |
[ vformat](<#/doc/utility/format/vformat>)(C++20) | variante não-template de [std::format](<#/doc/utility/format/format>) usando representação de argumento com tipo apagado
(função) |
[ vformat_to](<#/doc/utility/format/vformat_to>)(C++20) | variante não-template de [std::format_to](<#/doc/utility/format/format_to>) usando representação de argumento com tipo apagado
(modelo de função) |