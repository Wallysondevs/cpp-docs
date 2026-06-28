# std::is_placeholder

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template< class T >
struct is_placeholder;
```

Se `T` for o tipo de um placeholder padrão `(_1, _2, _3, ...)`, então este template é derivado de [std::integral_constant](<#/doc/types/integral_constant>)<int, 1>, [std::integral_constant](<#/doc/types/integral_constant>)<int, 2>, [std::integral_constant](<#/doc/types/integral_constant>)<int, 3>, respectivamente.

Se `T` não for um tipo de placeholder padrão, este template é derivado de [std::integral_constant](<#/doc/types/integral_constant>)<int, 0>.

Um programa pode especializar este template para um [tipo definido pelo programa](<#/doc/language/type-id>) `T` para implementar [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>) com característica base de [std::integral_constant](<#/doc/types/integral_constant>)<int, N> com N positivo para indicar que `T` deve ser tratado como o N-ésimo tipo de placeholder.

[std::bind](<#/doc/utility/functional/bind>) usa `std::is_placeholder` para detectar placeholders para argumentos não vinculados.

### Template de variável auxiliar

```cpp
template< class T >
constexpr int is_placeholder_v = is_placeholder<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | valor do placeholder ou ​0​ para tipos que não são placeholders
(constante membro estática pública)

### Funções membro

operator int | converte o objeto para int, retorna value
(função membro pública)
operator()(C++14) | retorna value
(função membro pública)

### Tipos membro

Tipo | Definição
---|---
`value_type` | int
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<int, value>

### Exemplo

Execute este código
```cpp
    #include <functional>
    #include <iostream>
    #include <type_traits>
    
    struct My_2 {} my_2;
    
    namespace std
    {
        template<>
        struct is_placeholder<My_2> : public integral_constant<int, 2> {};
    }
    
    int f(int n1, int n2)
    {
        return n1 + n2;
    }
    
    int main()
    {
        std::cout << "Standard placeholder _5 is for the argument number "
                  << std::is_placeholder_v<decltype(std::placeholders::_5)>
                  << '\n';
    
        auto b = std::bind(f, my_2, 2);
        std::cout << "Adding 2 to 11 selected with a custom placeholder gives " 
                  << b(10, 11) // the first argument, namely 10, is ignored
                  << '\n';
    }
```

Saída:
```
    Standard placeholder _5 is for the argument number 5
    Adding 2 to 11 selected with a custom placeholder gives 13
```

### Veja também

[ bind](<#/doc/utility/functional/bind>)(C++11) | vincula um ou mais argumentos a um objeto de função
(template de função)
[ _1, _2, _3, _4, ...](<#/doc/utility/functional/placeholders>)(C++11) | placeholders para os argumentos não vinculados em uma expressão `std::bind`
(constante)