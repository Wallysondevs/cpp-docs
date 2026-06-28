# std::enable_if

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< bool B, class T = void >
struct enable_if;
```

Se `B` for true, `std::enable_if` possui um typedef de membro público `type`, igual a `T`; caso contrário, não há typedef de membro.

Esta metafunção é uma maneira conveniente de aproveitar [SFINAE](<#/doc/language/sfinae>) antes dos [concepts](<#/doc/language/constraints>) do C++20, em particular para remover condicionalmente funções do [conjunto de candidatos](<#/doc/language/overload_resolution>) com base em type traits, permitindo sobrecargas de função ou especializações separadas com base nessas diferentes type traits.

`std::enable_if` pode ser usado de várias formas, incluindo:

  * como um argumento de função adicional (não aplicável à maioria das sobrecargas de operador),
  * como um tipo de retorno (não aplicável a construtores e destrutores),
  * como um parâmetro de template de classe ou template de função.

Se o programa adicionar especializações para `std::enable_if`, o comportamento é indefinido.

### Tipos de membro

Tipo | Definição
---|---
`type` | ou `T` ou nenhum membro, dependendo do valor de `B`

### Tipos auxiliares

```cpp
template< bool B, class T = void >
using enable_if_t = typename enable_if<B,T>::type;  // (desde C++14)
```

### Implementação possível
```cpp
    template<bool B, class T = void>
    struct enable_if {};
    
    template<class T>
    struct enable_if<true, T> { typedef T type; };
```

---

### Notas

Um erro comum é declarar dois templates de função que diferem apenas em seus argumentos de template padrão. Isso não funciona porque as declarações são tratadas como redeclarações do mesmo template de função (argumentos de template padrão não são considerados na [equivalência de template de função](<#/doc/language/function_template>)).
```cpp
    /* WRONG */
    
    struct T
    {
        enum { int_t, float_t } type;
    
        template<typename Integer,
                 typename = std::enable_if_t<std::is_integral<Integer>::value>>
        T(Integer) : type(int_t) {}
    
        template<typename Floating,
                 typename = std::enable_if_t<std::is_floating_point<Floating>::value>>
        T(Floating) : type(float_t) {} // error: treated as redefinition
    };
    
    /* RIGHT */
    
    struct T
    {
        enum { int_t, float_t } type;
    
        template<typename Integer,
                 std::enable_if_t<std::is_integral<Integer>::value, bool> = true>
        T(Integer) : type(int_t) {}
    
        template<typename Floating,
                 std::enable_if_t<std::is_floating_point<Floating>::value, bool> = true>
        T(Floating) : type(float_t) {} // OK
    };
```

Deve-se ter cuidado ao usar `enable_if` no tipo de um parâmetro de template não-tipo de um template de função com escopo de namespace. Algumas especificações ABI, como a ABI Itanium, não incluem as porções dependentes da instanciação de parâmetros de template não-tipo no mangling, o que significa que especializações de dois templates de função distintos podem acabar com o mesmo nome mangled e serem erroneamente linkadas juntas. Por exemplo:
```cpp
    // first translation unit
    
    struct X
    {
        enum { value1 = true, value2 = true };
    };
    
    template<class T, std::enable_if_t<T::value1, int> = 0>
    void func() {} // #1
    
    template void func<X>(); // #2
    
    // second translation unit
    
    struct X
    {
        enum { value1 = true, value2 = true };
    };
    
    template<class T, std::enable_if_t<T::value2, int> = 0>
    void func() {} // #3
    
    template void func<X>(); // #4
```

Os templates de função #1 e #3 possuem assinaturas diferentes e são templates distintos. No entanto, #2 e #4, apesar de serem instanciações de diferentes templates de função, possuem o mesmo nome mangled [na ABI C++ Itanium](<https://github.com/itanium-cxx-abi/cxx-abi/issues/20>) (`_Z4funcI1XLi0EEvv`), o que significa que o linker os considerará erroneamente como a mesma entidade.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <new>
    #include <string>
    #include <type_traits>
    
    namespace detail
    { 
        void* voidify(const volatile void* ptr) noexcept { return const_cast<void*>(ptr); } 
    }
    
    // #1, enabled via the return type
    template<class T>
    typename std::enable_if<std::is_trivially_default_constructible<T>::value>::type 
        construct(T*) 
    {
        std::cout << "default constructing trivially default constructible T\n";
    }
    
    // same as above
    template<class T>
    typename std::enable_if<!std::is_trivially_default_constructible<T>::value>::type 
        construct(T* p) 
    {
        std::cout << "default constructing non-trivially default constructible T\n";
        ::new(detail::voidify(p)) T;
    }
    
    // #2
    template<class T, class... Args>
    std::enable_if_t<std::is_constructible<T, Args&&...>::value> // Using helper type
        construct(T* p, Args&&... args) 
    {
        std::cout << "constructing T with operation\n";
        ::new(detail::voidify(p)) T(static_cast<Args&&>(args)...);
    }
    
    // #3, enabled via a parameter
    template<class T>
    void destroy(
        T*, 
        typename std::enable_if<
            std::is_trivially_destructible<T>::value
        >::type* = 0)
    {
        std::cout << "destroying trivially destructible T\n";
    }
    
    // #4, enabled via a non-type template parameter
    template<class T,
             typename std::enable_if<
                 !std::is_trivially_destructible<T>{} &&
                 (std::is_class<T>{} || std::is_union<T>{}),
                 bool>::type = true>
    void destroy(T* t)
    {
        std::cout << "destroying non-trivially destructible T\n";
        t->~T();
    }
    
    // #5, enabled via a type template parameter
    template<class T,
    	 typename = std::enable_if_t<std::is_array<T>::value>>
    void destroy(T* t) // note: function signature is unmodified
    {
        for (std::size_t i = 0; i < std::extent<T>::value; ++i)
            destroy((*t)[i]);
    }
    
    /*
    template<class T,
    	 typename = std::enable_if_t<std::is_void<T>::value>>
    void destroy(T* t) {} // error: has the same signature with #5
    */
    
    // the partial specialization of A is enabled via a template parameter
    template<class T, class Enable = void>
    class A {}; // primary template
    
    template<class T>
    class A<T, typename std::enable_if<std::is_floating_point<T>::value>::type>
    {}; // specialization for floating point types
    
    int main()
    {
        union { int i; char ssizeof([std::string)]; } u;
    
        construct(reinterpret_cast<int*>(&u));
        destroy(reinterpret_cast<int*>(&u));
    
        construct(reinterpret_cast<std::string*>(&u), "Hello");
        destroy(reinterpret_cast<std::string*>(&u));
    
        A<int>{}; // OK: matches the primary template
        A<double>{}; // OK: matches the partial specialization
    }
```

Saída:
```
    default constructing trivially default constructible T
    destroying trivially destructible T
    constructing T with operation
    destroying non-trivially destructible T
```

### Veja também

[ void_t](<#/doc/types/void_t>)(C++17) | template de alias variádico void
(template de alias)
  * [`static_assert`](<#/doc/language/static_assert>)
  * [SFINAE](<#/doc/language/sfinae>)
  * [Constraints and Concepts](<#/doc/language/constraints>)
