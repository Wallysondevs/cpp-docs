# std::get(std::variant)

Definido no cabeçalho `[<variant>](<#/doc/header/variant>)`

```c
template< std::size_t I, class... Types >
constexpr std::variant_alternative_t<I, std::variant<Types...>>&
get( std::variant<Types...>& v );
template< std::size_t I, class... Types >
constexpr std::variant_alternative_t<I, std::variant<Types...>>&&
get( std::variant<Types...>&& v );
template< std::size_t I, class... Types >
constexpr const std::variant_alternative_t<I, std::variant<Types...>>&
get( const std::variant<Types...>& v );
template< std::size_t I, class... Types >
constexpr const std::variant_alternative_t<I, std::variant<Types...>>&&
get( const std::variant<Types...>&& v );
template< class T, class... Types >
constexpr T& get( std::variant<Types...>& v );
template< class T, class... Types >
constexpr T&& get( std::variant<Types...>&& v );
template< class T, class... Types >
constexpr const T& get( const std::variant<Types...>& v );
template< class T, class... Types >
constexpr const T&& get( const std::variant<Types...>&& v );
```

1) Acessor de valor baseado em índice: Se v.index() == I, retorna uma referência ao valor armazenado em v. Caso contrário, lança [std::bad_variant_access](<#/doc/utility/variant/bad_variant_access>). A chamada é malformada se `I` não for um índice válido no variant.

2) Acessor de valor baseado em tipo: Se v contiver a alternativa `T`, retorna uma referência ao valor armazenado em v. Caso contrário, lança [std::bad_variant_access](<#/doc/utility/variant/bad_variant_access>). A chamada é malformada se `T` não for um elemento único de Types....

### Parâmetros de template

- **I** — índice a ser procurado
- **T** — tipo único a ser procurado
- **Types...** — tipos que formam o `variant`

### Parâmetros

- **v** — um `variant`

### Valor de retorno

Referência ao valor armazenado no variant.

### Exceções

1,2) Lança [std::bad_variant_access](<#/doc/utility/variant/bad_variant_access>) em caso de erros.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string>
    #include <variant>
    
    int main()
    {
        std::variant<int, float> v{12}, w;
        std::cout << std::get<int>(v) << '\n';
        w = std::get<int>(v);
        w = std::get<0>(v); // same effect as the previous line
    
    //  std::get<double>(v); // error: no double in [int, float]
    //  std::get<3>(v);      // error: valid index values are 0 and 1
    
        try
        {
            w = 42.0f;
            std::cout << std::get<float>(w) << '\n'; // ok, prints 42
            w = 42;
            std::cout << std::get<float>(w) << '\n'; // throws
        }
        catch (std::bad_variant_access const& ex)
        {
            std::cout << ex.what() << ": w contained int, not float\n";
        }
    }
```

Saída possível:
```
    12
    42
    Unexpected index: w contained int, not float
```

### Veja também

[ get_if](<#/doc/utility/variant/get_if>)(C++17) | obtém um ponteiro para o valor de um `variant` apontado, dado o índice ou o tipo (se único), retorna null em caso de erro
(modelo de função)
[ get(std::tuple)](<#/doc/utility/tuple/get>)(C++11) | tuple acessa elemento especificado
(modelo de função)
[ get(std::array)](<#/doc/container/array/get>)(C++11) | acessa um elemento de um `array`
(modelo de função)
[ get(std::pair)](<#/doc/utility/pair/get>)(C++11) | acessa um elemento de um `pair`
(modelo de função)
[ get(std::ranges::subrange)](<#/doc/ranges/subrange/get>)(C++20) | obtém iterator ou sentinel de um [std::ranges::subrange](<#/doc/ranges/subrange>)
(modelo de função)
[ get(std::complex)](<#/doc/numeric/complex/get>)(C++26) | obtém uma referência para a parte real ou imaginária de um [std::complex](<#/doc/numeric/complex>)
(modelo de função)