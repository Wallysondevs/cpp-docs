# std::is_compound

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct is_compound;
```

`std::is_compound` é um [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>).

Se `T` é um tipo composto (isto é, array, função, ponteiro para objeto, ponteiro para função, ponteiro para membro de objeto, ponteiro para membro de função, referência, classe, união ou enumeração, incluindo quaisquer variantes cv-qualificadas), fornece a constante membro `value` igual a true. Para qualquer outro tipo, `value` é false.

Se o programa adicionar especializações para `std::is_compound` ou `std::is_compound_v`, o comportamento é indefinido.

### Parâmetros de template

- **T** — um tipo para verificar

### Template de variável auxiliar

```cpp
template< class T >
constexpr bool is_compound_v = is_compound<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se `T` é um tipo composto, false caso contrário
(constante membro estática pública)

### Funções membro

operator bool | converte o objeto para bool, retorna value
(função membro pública)
operator()(C++14) | retorna value
(função membro pública)

### Tipos membro

Tipo | Definição
---|---
`value_type` | bool
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>

### Notas

Tipos compostos são os tipos que são construídos a partir de tipos fundamentais. Qualquer tipo C++ é fundamental ou composto.

### Possível implementação
```cpp
    template<class T>
    struct is_compound : std::integral_constant<bool, !std::is_fundamental<T>::value> {};
```

---

### Exemplo

Execute este código
```cpp
    #include <type_traits>
    #include <iostream>
    
    static_assert(not std::is_compound_v<int>);
    static_assert(std::is_compound_v<int*>);
    static_assert(std::is_compound_v<int&>);
    
    void f();
    static_assert(std::is_compound_v<decltype(f)>);
    static_assert(std::is_compound_v<decltype(&f)>);
    
    static_assert(std::is_compound_v<char[100]>);
    
    class C {};
    static_assert(std::is_compound_v<C>);
    
    union U {};
    static_assert(std::is_compound_v<U>);
    
    enum struct E { e };
    static_assert(std::is_compound_v<E>);
    static_assert(std::is_compound_v<decltype(E::e)>);
    
    struct S
    {
        int i : 8;
        int j;
        void foo();
    };
    static_assert(not std::is_compound_v<decltype(S::i)>);
    static_assert(not std::is_compound_v<decltype(S::j)>);
    static_assert(std::is_compound_v<decltype(&S::j)>);
    static_assert(std::is_compound_v<decltype(&S::foo)>);
    
    int main()
    {
        std::cout << "All checks have passed\n";
    }
```

### Veja também

[ is_fundamental](<#/doc/types/is_fundamental>)(C++11) | verifica se um tipo é um tipo fundamental
(template de classe)
[ is_scalar](<#/doc/types/is_scalar>)(C++11) | verifica se um tipo é um tipo escalar
(template de classe)
[ is_object](<#/doc/types/is_object>)(C++11) | verifica se um tipo é um tipo de objeto
(template de classe)
[ is_array](<#/doc/types/is_array>)(C++11) | verifica se um tipo é um tipo array
(template de classe)