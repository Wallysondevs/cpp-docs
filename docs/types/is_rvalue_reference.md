# std::is_rvalue_reference

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct is_rvalue_reference;
```

`std::is_rvalue_reference` é um [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>).

Verifica se `T` é um tipo de referência rvalue. Fornece a constante membro `value` que é igual a `true` se `T` for um tipo de referência rvalue. Caso contrário, `value` é igual a `false`.

Se o programa adicionar especializações para `std::is_rvalue_reference` ou `std::is_rvalue_reference_v`, o comportamento é indefinido.

### Parâmetros de template

- **T** — um tipo a ser verificado

### Modelo de variável auxiliar

```cpp
template< class T >
constexpr bool is_rvalue_reference_v = is_rvalue_reference<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | `true` se `T` for um tipo de referência rvalue, `false` caso contrário
(constante membro estática pública)

### Funções membro

operator bool | converte o objeto para `bool`, retorna `value`
(função membro pública)
operator()(C++14) | retorna `value`
(função membro pública)

### Tipos membro

Tipo | Definição
---|---
`value_type` | `bool`
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>

### Possível implementação
```cpp
    template<class T> struct is_rvalue_reference : std::false_type {};
    template<class T> struct is_rvalue_reference<T&&> : std::true_type {};
```

---

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <type_traits>
     
    class A {};
     
    static_assert
    (
        std::is_rvalue_reference_v<A> == false and
        std::is_rvalue_reference_v<A&> == false and
        std::is_rvalue_reference_v<A&&> != false and
        std::is_rvalue_reference_v<char> == false and
        std::is_rvalue_reference_v<char&> == false and
        std::is_rvalue_reference_v<char&&> != false
    );
     
    template <typename T>
    void test(T&& x)
    {
        static_assert(std::is_same_v<T&&, decltype(x)>);
        std::cout << "T\t" << std::is_rvalue_reference<T>::value << '\n';
        std::cout << "T&&\t" << std::is_rvalue_reference<T&&>::value << '\n';
        std::cout << "decltype(x)\t" << std::is_rvalue_reference<decltype(x)>::value << '\n';
    }
     
    int main()
    {
        std::cout << std::boolalpha;
        std::cout << "A\t" << std::is_rvalue_reference<A>::value << '\n';
        std::cout << "A&\t" << std::is_rvalue_reference<A&>::value << '\n';
        std::cout << "A&&\t" << std::is_rvalue_reference<A&&>::value << '\n';
        std::cout << "char\t" << std::is_rvalue_reference<char>::value << '\n';
        std::cout << "char&\t" << std::is_rvalue_reference<char&>::value << '\n';
        std::cout << "char&&\t" << std::is_rvalue_reference<char&&>::value << '\n';
     
        std::cout << "\ntest(42)\n";
        test(42);
     
        std::cout << "\ntest(x)\n";
        int x = 42;
        test(x);
    }
```

Saída:
```
    A	false
    A&	false
    A&&	true
    char	false
    char&	false
    char&&	true
     
    test(42)
    T	false
    T&&	true
    decltype(x)	true
     
    test(x)
    T	false
    T&&	false
    decltype(x)	false
```

### Veja também

[ is_lvalue_reference](<#/doc/types/is_lvalue_reference>)(C++11) | verifica se um tipo é uma _referência lvalue_
(modelo de classe)
[ is_reference](<#/doc/types/is_reference>)(C++11) | verifica se um tipo é uma _referência lvalue_ ou _referência rvalue_
(modelo de classe)