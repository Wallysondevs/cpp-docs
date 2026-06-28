# std::get_if (std::variant)

Definido no cabeçalho `[<variant>](<#/doc/header/variant>)`

```c
template< std::size_t I, class... Types >
constexpr std::add_pointer_t<std::variant_alternative_t<I, std::variant<Types...>>>
get_if( std::variant<Types...>* pv ) noexcept;
template< std::size_t I, class... Types >
constexpr std::add_pointer_t<const std::variant_alternative_t<I, std::variant<Types...>>>
get_if( const std::variant<Types...>* pv ) noexcept;
template< class T, class... Types >
constexpr std::add_pointer_t<T>
get_if( std::variant<Types...>* pv ) noexcept;
template< class T, class... Types >
constexpr std::add_pointer_t<const T>
get_if( const std::variant<Types...>* pv ) noexcept;
```

1) Acessor baseado em índice que não lança exceções: Se pv não for um ponteiro nulo e pv->index() == I, retorna um ponteiro para o valor armazenado na variant apontada por pv. Caso contrário, retorna um valor de ponteiro nulo. A chamada é malformada se `I` não for um índice válido na variant.

2) Acessor baseado em tipo que não lança exceções: Equivalente a (1) com `I` sendo o índice baseado em zero de `T` em Types.... A chamada é malformada se `T` não for um elemento único de Types....

### Parâmetros de template

- **I** — índice a ser procurado
- **Type** — tipo único a ser procurado

### Parâmetros

- **pv** — ponteiro para uma variant

### Valor de retorno

Ponteiro para o valor armazenado na variant apontada ou ponteiro nulo em caso de erro.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <variant>
    
    int main()
    {
        auto check_value = <int, float>& v)
        {
            if (const int* pval = std::get_if<int>(&v))
                std::cout << "variant value: " << *pval << '\n';
            else
                std::cout << "failed to get value!" << '\n';
        };
    
        std::variant<int, float> v{12}, w{3.f};
        check_value(v);
        check_value(w);
    }
```

Saída:
```
    variant value: 12
    failed to get value!
```

### Veja também

[ get(std::variant)](<#/doc/utility/variant/get>)(C++17) | lê o valor da variant dado o índice ou o tipo (se o tipo for único), lança exceção em caso de erro
(modelo de função)