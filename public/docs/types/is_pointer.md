# std::is_pointer

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct is_pointer;
```

`std::is_pointer` é um [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>).

Verifica se `T` é um [ponteiro para objeto ou função](<#/doc/language/pointer>) (incluindo ponteiro para void, mas excluindo ponteiro para membro) ou uma versão cv-qualificada do mesmo. Fornece a constante membro `value` que é igual a true, se `T` for um tipo de ponteiro para objeto/função. Caso contrário, `value` é igual a false.

Se o programa adicionar especializações para `std::is_pointer` ou `std::is_pointer_v`, o comportamento é indefinido.

### Parâmetros de template

- **T** — um tipo a ser verificado

### Helper variable template

```cpp
template< class T >
constexpr bool is_pointer_v = is_pointer<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se `T` for um tipo ponteiro, false caso contrário
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

### Possível implementação
```cpp
    template<class T>
    struct is_pointer : std::false_type {};
    
    template<class T>
    struct is_pointer<T*> : std::true_type {};
    
    template<class T>
    struct is_pointer<T* const> : std::true_type {};
    
    template<class T>
    struct is_pointer<T* volatile> : std::true_type {};
    
    template<class T>
    struct is_pointer<T* const volatile> : std::true_type {};
```

---

### Exemplo

Execute este código
```cpp
    #include <type_traits>
    
    int main()
    {
        struct A
        {
            int m;
            void f() {}
        };
    
        int A::*mem_data_ptr = &A::m;     // a pointer to member data
        void (A::*mem_fun_ptr)() = &A::f; // a pointer to member function
    
        static_assert(
               ! std::is_pointer<A>::value
            && ! std::is_pointer_v<A>    // same thing as above, but in C++17!
            && ! std::is_pointer<A>()    // same as above, using inherited operator bool
            && ! std::is_pointer<A>{}    // ditto
            && ! std::is_pointer<A>()()  // same as above, using inherited operator()
            && ! std::is_pointer<A>{}()  // ditto
            &&   std::is_pointer_v<A*>
            &&   std::is_pointer_v<A const* volatile>
            && ! std::is_pointer_v<A&>
            && ! std::is_pointer_v<decltype(mem_data_ptr)>
            && ! std::is_pointer_v<decltype(mem_fun_ptr)>
            &&   std::is_pointer_v<void*>
            && ! std::is_pointer_v<int>
            &&   std::is_pointer_v<int*>
            &&   std::is_pointer_v<int**>
            && ! std::is_pointer_v<int[10]>
            && ! std::is_pointer_v<std::nullptr_t>
            &&   std::is_pointer_v<void (*)()>
        );
    }
```

### Veja também

[ is_member_pointer](<#/doc/types/is_member_pointer>)(C++11) | verifica se um tipo é um ponteiro para uma função membro não estática ou objeto
(modelo de classe)
[ is_member_object_pointer](<#/doc/types/is_member_object_pointer>)(C++11) | verifica se um tipo é um ponteiro para objeto membro não estático
(modelo de classe)
[ is_member_function_pointer](<#/doc/types/is_member_function_pointer>)(C++11) | verifica se um tipo é um ponteiro para função membro não estática
(modelo de classe)
[ is_array](<#/doc/types/is_array>)(C++11) | verifica se um tipo é um tipo array
(modelo de classe)
[ is_scalar](<#/doc/types/is_scalar>)(C++11) | verifica se um tipo é um tipo escalar
(modelo de classe)