# std::remove_cv, std::remove_const, std::remove_volatile

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct remove_cv;
template< class T >
struct remove_const;
template< class T >
struct remove_volatile;
```

Fornece o typedef de membro `type` que é o mesmo que `T`, exceto que seus qualificadores cv de nível superior são removidos.

1) Remove o const de nível superior, ou o volatile de nível superior, ou ambos, se presentes.

2) Remove o const de nível superior.

3) Remove o volatile de nível superior.

Se o programa adicionar especializações para qualquer um dos templates descritos nesta página, o comportamento é indefinido.

### Tipos de membro

Nome | Definição
---|---
`type` | o tipo `T` sem qualificador cv

### Tipos auxiliares

```cpp
template< class T >
using remove_cv_t = typename remove_cv<T>::type;  // (desde C++14)
template< class T >
using remove_const_t = typename remove_const<T>::type;  // (desde C++14)
template< class T >
using remove_volatile_t = typename remove_volatile<T>::type;  // (desde C++14)
```

### Possível implementação
```cpp
    template<class T> struct remove_cv { typedef T type; };
    template<class T> struct remove_cv<const T> { typedef T type; };
    template<class T> struct remove_cv<volatile T> { typedef T type; };
    template<class T> struct remove_cv<const volatile T> { typedef T type; };
    
    template<class T> struct remove_const { typedef T type; };
    template<class T> struct remove_const<const T> { typedef T type; };
    
    template<class T> struct remove_volatile { typedef T type; };
    template<class T> struct remove_volatile<volatile T> { typedef T type; };
```

---

### Exemplo

Remover const/volatile de const volatile int* não modifica o tipo, porque o próprio ponteiro não é nem const nem volatile.

Execute este código
```cpp
    #include <type_traits>
    
    template<typename U, typename V>
    constexpr bool same = std::is_same_v<U, V>;
    
    static_assert
    (
        same<std::remove_cv_t<int>, int> &&
        same<std::remove_cv_t<const int>, int> &&
        same<std::remove_cv_t<volatile int>, int> &&
        same<std::remove_cv_t<const volatile int>, int> &&
        // remove_cv only works on types, not on pointers
        not same<std::remove_cv_t<const volatile int*>, int*> &&
        same<std::remove_cv_t<const volatile int*>, const volatile int*> &&
        same<std::remove_cv_t<const int* volatile>, const int*> &&
        same<std::remove_cv_t<int* const volatile>, int*>
    );
    
    int main() {}
```

### Veja também

[ is_const](<#/doc/types/is_const>)(C++11) | verifica se um tipo é qualificado como const
(modelo de classe)
[ is_volatile](<#/doc/types/is_volatile>)(C++11) | verifica se um tipo é qualificado como volatile
(modelo de classe)
[ add_cvadd_constadd_volatile](<#/doc/types/add_cv>)(C++11)(C++11)(C++11) | adiciona especificadores const e/ou volatile ao tipo fornecido
(modelo de classe)
[ remove_cvref](<#/doc/types/remove_cvref>)(C++20) | combina **std::remove_cv** e [std::remove_reference](<#/doc/types/remove_reference>)
(modelo de classe)