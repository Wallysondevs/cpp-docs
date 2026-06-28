# std::is_member_pointer

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct is_member_pointer;
```

`std::is_member_pointer` é um [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>).

Se `T` é um ponteiro para um objeto membro não estático ou um ponteiro para uma função membro não estática, fornece a constante membro value igual a true. Para qualquer outro tipo, value é false.

Se o programa adicionar especializações para `std::is_member_pointer` ou `std::is_member_pointer_v`, o comportamento é indefinido.

### Parâmetros de template

- **T** — um tipo a ser verificado

### Template de variável auxiliar

```cpp
template< class T >
constexpr bool is_member_pointer_v = is_member_pointer<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se `T` é um tipo de ponteiro para membro, false caso contrário
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

### Implementação possível
```cpp
    template<class T>
    struct is_member_pointer_helper : std::false_type {};
    
    template<class T, class U>
    struct is_member_pointer_helper<T U::*> : std::true_type {};
    
    template<class T>
    struct is_member_pointer : is_member_pointer_helper<typename std::remove_cv<T>::type> {};
```

---

### Exemplo

Run this code
```cpp
    #include <cassert>
    #include <type_traits>
    
    static_assert(!std::is_member_pointer_v<int*>);
    
    struct S
    {
        int i{42};
        int foo() { return 0xF00; }
    };
    using mem_int_ptr_t = int S::*;
    using mem_fun_ptr_t = int (S::*)();
    static_assert(std::is_member_pointer_v<mem_int_ptr_t>);
    static_assert(std::is_member_pointer_v<mem_fun_ptr_t>);
    
    int main()
    {
        S s;
    
        mem_int_ptr_t pm = &S::i;
        assert(s.i == s.*pm);
    
        mem_fun_ptr_t pmf = &S::foo;
        assert((s.*pmf)() == s.foo());
    }
```

### Veja também

[ is_pointer](<#/doc/types/is_pointer>)(C++11) | verifica se um tipo é um tipo de ponteiro
(template de classe)
[ is_member_object_pointer](<#/doc/types/is_member_object_pointer>)(C++11) | verifica se um tipo é um ponteiro para objeto membro não estático
(template de classe)
[ is_member_function_pointer](<#/doc/types/is_member_function_pointer>)(C++11) | verifica se um tipo é um ponteiro para função membro não estática
(template de classe)