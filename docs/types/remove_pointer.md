# std::remove_pointer

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct remove_pointer;
```

Fornece o typedef membro `type` que é o tipo apontado por `T`, ou, se `T` não for um ponteiro, então `type` é o mesmo que `T`.

Se o programa adicionar especializações para `std::remove_pointer`, o comportamento é indefinido.

### Tipos de membro

Nome | Definição
---|---
`type` | o tipo apontado por `T` ou `T` se não for um ponteiro

### Tipos auxiliares

```cpp
template< class T >
using remove_pointer_t = typename remove_pointer<T>::type;  // (desde C++14)
```

### Implementação possível
```cpp
    template<class T> struct remove_pointer { typedef T type; };
    template<class T> struct remove_pointer<T*> { typedef T type; };
    template<class T> struct remove_pointer<T* const> { typedef T type; };
    template<class T> struct remove_pointer<T* volatile> { typedef T type; };
    template<class T> struct remove_pointer<T* const volatile> { typedef T type; };
```

---

### Exemplo

Execute este código
```cpp
    #include <type_traits>
    
    static_assert
    (
        std::is_same_v<int, int> == true &&
        std::is_same_v<int, int*> == false &&
        std::is_same_v<int, int**> == false &&
        std::is_same_v<int, std::remove_pointer_t<int>> == true &&
        std::is_same_v<int, std::remove_pointer_t<int*>> == true &&
        std::is_same_v<int, std::remove_pointer_t<int**>> == false &&
        std::is_same_v<int, std::remove_pointer_t<int* const>> == true &&
        std::is_same_v<int, std::remove_pointer_t<int* volatile>> == true &&
        std::is_same_v<int, std::remove_pointer_t<int* const volatile>> == true
    );
    
    int main() {}
```

### Veja também

[ is_pointer](<#/doc/types/is_pointer>)(C++11) | verifica se um tipo é um tipo de ponteiro
(class template)
[ add_pointer](<#/doc/types/add_pointer>)(C++11) | adiciona um ponteiro ao tipo fornecido
(class template)