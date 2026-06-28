# std::optional&lt;T&gt;::and_then

```cpp
template< class F >
constexpr auto and_then( F&& f ) &;  // (1) (desde C++23)
template< class F >
constexpr auto and_then( F&& f ) const&;  // (2) (desde C++23)
template< class F >
constexpr auto and_then( F&& f ) &&;  // (3) (desde C++23)
template< class F >
constexpr auto and_then( F&& f ) const&&;  // (4) (desde C++23)
```

  
Se *this contiver um valor, invoca f com o valor contido como argumento e retorna o resultado dessa invocação; caso contrário, retorna um `std::optional` vazio.

O tipo de retorno (veja abaixo) deve ser uma especialização de [std::optional](<#/doc/utility/optional>) (diferente de [`transform()`](<#/doc/utility/optional/transform>)). Caso contrário, o programa é malformado.

1) Equivalente a  

```cpp
    if (*this)
        return std::invoke(std::forward<F>(f), value());
    else
        return std::remove_cvref_t<std::invoke_result_t<F, T&>>{};
```

2) Equivalente a  

```cpp
    if (*this)
        return std::invoke(std::forward<F>(f), value());
    else
        return std::remove_cvref_t<std::invoke_result_t<F, const T&>>{};
```

3) Equivalente a  

```cpp
    if (*this)
        return std::invoke(std::forward<F>(f), std::move(value()));
    else
        return std::remove_cvref_t<std::invoke_result_t<F, T>>{};
```

4) Equivalente a  

```cpp
    if (*this)
        return std::invoke(std::forward<F>(f), std::move(value()));
    else
        return std::remove_cvref_t<std::invoke_result_t<F, const T>>{};
```

### Parâmetros

f  |  \-  |  uma função adequada ou objeto [Callable](<#/doc/named_req/Callable>) que retorna um [std::optional](<#/doc/utility/optional>)  
  
### Valor de retorno

O resultado de f ou um [std::optional](<#/doc/utility/optional>) vazio, conforme descrito acima.

### Observações

Algumas linguagens chamam esta operação de _flatmap_.

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_optional`](<#/doc/feature_test>) | [`202110L`](<#/>) | (C++23) | [Operações monádicas](<#/doc/utility/optional>) em [std::optional](<#/doc/utility/optional>)  
  
### Exemplo

Execute este código
```cpp 
    #include <charconv>
    #include <iomanip>
    #include <iostream>
    #include <optional>
    #include <ranges>
    #include <string>
    #include <string_view>
    #include <vector>
    
    std::optional<int> to_int(std::string_view sv)
    {
        int r{};
        auto [ptr, ec]{std::from_chars(sv.data(), sv.data() + sv.size(), r)};
        if (ec == std::errc())
            return r;
        else
            return std::nullopt;
    }
    
    int main()
    {
        using namespace std::literals;
    
        const std::vector<std::optional<std::string>> v
        {
            "1234", "15 foo", "bar", "42", "5000000000", " 5", std::nullopt, "-43"
        };
    
        for (auto&& x : v | std::views::transform(
            
            {
                // imprime para depuração o conteúdo do optional<string> de entrada
                std::cout << std::left << std::setw(13)
                          << std::quoted(o.value_or("nullopt")) << " -> ";
    
                return o
                    // se optional for nullopt, converte-o para optional com string ""
                    .or_else([]{ return std::optional{""s}; })
                    // flatmap de strings para ints (criando optionals vazios onde falha)
                    .and_then(to_int)
                    // mapeia int para int + 1
                    .transform( { return n + 1; })
                    // converte de volta para strings
                    .transform( { return std::to_string(n); })
                    // substitui todos os optionals vazios que foram deixados por and_then e ignorados por transforms por "NaN"
                    .value_or("NaN"s);
            }))
            std::cout << x << '\n';
    }
```

Saída: 
```
    "1234"        -> 1235
    "15 foo"      -> 16
    "bar"         -> NaN
    "42"          -> 43
    "5000000000"  -> NaN
    " 5"          -> NaN
    "nullopt"     -> NaN
    "-43"         -> -42
```

### Veja também

[ value_or](<#/doc/utility/optional/value_or>) |  retorna o valor contido se disponível, outro valor caso contrário   
(função membro pública)  
[ transform](<#/doc/utility/optional/transform>)(C++23) |  retorna um `optional` contendo o valor contido transformado se ele existir, ou um `optional` vazio caso contrário   
(função membro pública)  
[ or_else](<#/doc/utility/optional/or_else>)(C++23) |  retorna o próprio `optional` se ele contiver um valor, ou o resultado da função fornecida caso contrário   
(função membro pública)