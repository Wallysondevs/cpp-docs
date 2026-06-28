# std::add_pointer

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct add_pointer;
```

Se `T` for um [tipo referenciável](<#/doc/meta>) ou `void` (possivelmente cv-qualificado), o `typedef` membro `type` fornecido é `typename [std::remove_reference](<#/doc/types/remove_reference>)<T>::type*`.

Caso contrário, o `typedef` membro `type` fornecido é `T`.

Se o programa adicionar especializações para `std::add_pointer`, o comportamento é indefinido.

### Tipos aninhados

Nome | Definição
---|---
`type` | determinado como acima

### Tipos auxiliares

```cpp
template< class T >
using add_pointer_t = typename add_pointer<T>::type;  // (desde C++14)
```

### Possível implementação
```cpp
    namespace detail
    {
        template<class T>
        struct type_identity { using type = T; }; // ou use std::type_identity (desde C++20)
    
        template<class T>
        auto try_add_pointer(int)
          -> type_identity<typename std::remove_reference<T>::type*>; // caso usual
    
        template<class T>
        auto try_add_pointer(...)
          -> type_identity<T>; // caso incomum (não pode formar std::remove_reference<T>::type*)
    } // namespace detail
    
    template<class T>
    struct add_pointer : decltype(detail::try_add_pointer<T>(0)) {};
```

---

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <type_traits>
    
    template<typename F, typename Class>
    void ptr_to_member_func_cvref_test(F Class::*)
    {
        // F é um "tipo de função abominável"
        using FF = std::add_pointer_t<F>;
        static_assert(std::is_same_v<F, FF>, "FF deve ser precisamente F");
    }
    
    struct S
    {
        void f_ref() & {}
        void f_const() const {}
    };
    
    int main()
    {
        int i = 123;
        int& ri = i;
        typedef std::add_pointer<decltype(i)>::type IntPtr;
        typedef std::add_pointer<decltype(ri)>::type IntPtr2;
        IntPtr pi = &i;
        std::cout << "i = " << i << '\n';
        std::cout << "*pi = " << *pi << '\n';
    
        static_assert(std::is_pointer_v<IntPtr>, "IntPtr deve ser um ponteiro");
        static_assert(std::is_same_v<IntPtr, int*>, "IntPtr deve ser um ponteiro para int");
        static_assert(std::is_same_v<IntPtr2, IntPtr>, "IntPtr2 deve ser igual a IntPtr");
    
        typedef std::remove_pointer<IntPtr>::type IntAgain;
        IntAgain j = i;
        std::cout << "j = " << j << '\n';
    
        static_assert(!std::is_pointer_v<IntAgain>, "IntAgain não deve ser um ponteiro");
        static_assert(std::is_same_v<IntAgain, int>, "IntAgain deve ser igual a int");
    
        ptr_to_member_func_cvref_test(&S::f_ref);
        ptr_to_member_func_cvref_test(&S::f_const);
    }
```

Saída:
```
    i = 123
    *pi = 123
    j = 123
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2101](<https://cplusplus.github.io/LWG/issue2101>) | C++11 | o programa era malformado se `T` fosse um [tipo de função](<#/doc/language/function>) com cv ou ref | o tipo produzido é `T` neste caso

### Ver também

[ is_pointer](<#/doc/types/is_pointer>)(C++11) | verifica se um tipo é um tipo ponteiro
---|---
(modelo de classe) |
[ remove_pointer](<#/doc/types/remove_pointer>)(C++11) | remove um ponteiro do tipo fornecido
(modelo de classe) |