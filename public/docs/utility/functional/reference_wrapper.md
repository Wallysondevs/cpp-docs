# std::reference_wrapper

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template< class T >
class reference_wrapper;
```

`std::reference_wrapper` é um modelo de classe que envolve uma referência em um objeto copiável e atribuível.

Especificamente, `std::reference_wrapper` é um wrapper [CopyConstructible](<#/doc/named_req/CopyConstructible>) e [CopyAssignable](<#/doc/named_req/CopyAssignable>) em torno de uma referência a objeto ou referência a função do tipo `T`. Instâncias de `std::reference_wrapper` são objetos (podem ser copiadas ou armazenadas em containers), mas são implicitamente conversíveis para T&, de modo que podem ser usadas como argumentos com funções que recebem o tipo subjacente por referência.

Se a referência armazenada for [Callable](<#/doc/named_req/Callable>), `std::reference_wrapper` é chamável com os mesmos argumentos.

As funções auxiliares [std::ref](<#/doc/utility/functional/ref>) e [std::cref](<#/doc/utility/functional/ref>) são frequentemente usadas para gerar objetos `std::reference_wrapper`.

`std::reference_wrapper` é usado para passar objetos por referência para [std::bind](<#/doc/utility/functional/bind>), o construtor de [std::thread](<#/doc/thread/thread>), ou as funções auxiliares [std::make_pair](<#/doc/utility/pair/make_pair>) e [std::make_tuple](<#/doc/utility/tuple/make_tuple>). Também pode ser usado como um mecanismo para armazenar referências dentro de containers padrão (como [std::vector](<#/doc/container/vector>)) que normalmente não podem conter referências.

`std::reference_wrapper` é garantido ser [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>). | (desde C++17)
---|---
`T` pode ser um tipo incompleto. | (desde C++20)

### Tipos de membros

type | definição
---|---
`type` | `T`
`result_type`
(obsoleto em C++17)
(removido em C++20) | O tipo de retorno de `T` se `T` for uma função. Caso contrário, não definido.
`argument_type`
(obsoleto em C++17)
(removido em C++20) |

  * se `T` for uma função ou ponteiro para função que recebe um argumento do tipo `A1`, então `argument_type` é `A1`

  * se `T` for um ponteiro para função membro da classe `T0` que não recebe argumentos, então `argument_type` é `T0*`, possivelmente cv-qualificado

  * se `T` for um tipo de classe com um tipo de membro `T::argument_type`, então `argument_type` é um alias desse

`first_argument_type`
(obsoleto em C++17)
(removido em C++20) |

  * se `T` for uma função ou ponteiro para função que recebe dois argumentos dos tipos `A1` e `A2`, então `first_argument_type` é `A1`

  * se `T` for um ponteiro para função membro da classe `T0` que recebe um argumento, então `first_argument_type` é `T0*`, possivelmente cv-qualificado

  * se `T` for um tipo de classe com um tipo de membro `T::first_argument_type`, então `first_argument_type` é um alias desse

`second_argument_type`
(obsoleto em C++17)
(removido em C++20) |

  * se `T` for uma função ou ponteiro para função que recebe dois argumentos dos tipos `A1` e `A2`, então `second_argument_type` é `A2`

  * se `T` for um ponteiro para função membro da classe `T0` que recebe um argumento `A1`, então `second_argument_type` é `A1`, possivelmente cv-qualificado

  * se `T` for um tipo de classe com um tipo de membro `T::second_argument_type`, então `second_argument_type` é um alias desse

### Funções de membros

[ (constructor)](<#/doc/utility/functional/reference_wrapper/reference_wrapper>) | armazena uma referência em um novo objeto **std::reference_wrapper**
(função membro pública)
[ operator=](<#/>) | revincula um **std::reference_wrapper**
(função membro pública)
[ getoperator T&](<#/doc/utility/functional/reference_wrapper/get>) | acessa a referência armazenada
(função membro pública)
[ operator()](<#/>) | chama a função armazenada
(função membro pública)

### Funções não-membros

[ operator==operator<=>](<#/doc/utility/functional/reference_wrapper/operator_cmp>)(C++26) | compara objetos `reference_wrapper` como suas referências armazenadas
(função)

### [Guias de dedução](<#/doc/utility/functional/reference_wrapper/deduction_guides>)(desde C++17)

### Classes auxiliares

[ std::basic_common_reference<std::reference_wrapper>](<#/doc/utility/functional/reference_wrapper/basic_common_reference>)(C++23) | determina o tipo de referência comum de `reference_wrapper` e não-`reference_wrapper`
(especialização de modelo de classe)

### Possível implementação
```cpp
    namespace detail
    {
        template<class T> constexpr T& FUN(T& t) noexcept { return t; }
        template<class T> void FUN(T&&) = delete;
    }
    
    template<class T>
    class reference_wrapper
    {
    public:
        // types
        using type = T;
    
        // construct/copy/destroy
        template<class U, class = decltype(
            detail::FUN<T>(std::declval<U>()),
            std::enable_if_t<!std::is_same_v<reference_wrapper, std::remove_cvref_t<U>>>()
        )>
        constexpr reference_wrapper(U&& u)
            noexcept(noexcept(detail::FUN<T>(std::forward<U>(u))))
            : _ptr(std::addressof(detail::FUN<T>(std::forward<U>(u)))) {}
    
        reference_wrapper(const reference_wrapper&) noexcept = default;
    
        // assignment
        reference_wrapper& operator=(const reference_wrapper& x) noexcept = default;
    
        // access
        constexpr operator T& () const noexcept { return *_ptr; }
        constexpr T& get() const noexcept { return *_ptr; }
    
        template<class... ArgTypes>
        constexpr std::invoke_result_t<T&, ArgTypes...>
            operator() (ArgTypes&&... args ) const
                noexcept(std::is_nothrow_invocable_v<T&, ArgTypes...>)
        {
            return std::invoke(get(), std::forward<ArgTypes>(args)...);
        }
    
    private:
        T* _ptr;
    };
    
    // deduction guides
    template<class T>
    reference_wrapper(T&) -> reference_wrapper<T>;
```

---

### Exemplo

Demonstra o uso de `std::reference_wrapper` como um container de referências, o que torna possível acessar o mesmo container usando múltiplos índices.

Execute este código
```cpp
    #include <algorithm>
    #include <functional>
    #include <iostream>
    #include <list>
    #include <numeric>
    #include <random>
    #include <vector>
    
    void println(auto const rem, std::ranges::range auto const& v)
    {
        for (std::cout << rem; auto const& e : v)
            std::cout << e << ' ';
        std::cout << '\n';
    }
    
    int main()
    {
        std::list<int> l(10);
        std::iota(l.begin(), l.end(), -4);
    
        // can't use shuffle on a list (requires random access), but can use it on a vector
        std::vector<std::reference_wrapper<int>> v(l.begin(), l.end());
    
        std::ranges::shuffle(v, std::mt19937{std::random_device{}()});
    
        println("Contents of the list: ", l);
        println("Contents of the list, as seen through a shuffled vector: ", v);
    
        std::cout << "Doubling the values in the initial list...\n";
        std::ranges::for_each(l,  { i *= 2; });
    
        println("Contents of the list, as seen through a shuffled vector: ", v);
    }
```

Saída possível:
```
    Contents of the list: -4 -3 -2 -1 0 1 2 3 4 5
    Contents of the list, as seen through a shuffled vector: -1 2 -2 1 5 0 3 -3 -4 4
    Doubling the values in the initial list...
    Contents of the list, as seen through a shuffled vector: -2 4 -4 2 10 0 6 -6 -8 8
```

### Veja também

[ refcref](<#/doc/utility/functional/ref>)(C++11)(C++11) | cria um **std::reference_wrapper** com um tipo deduzido de seu argumento
(modelo de função)
[ bind](<#/doc/utility/functional/bind>)(C++11) | vincula um ou mais argumentos a um objeto de função
(modelo de função)
[ unwrap_referenceunwrap_ref_decay](<#/doc/utility/functional/unwrap_reference>)(C++20)(C++20) | obtém o tipo de referência envolvido em **std::reference_wrapper**
(modelo de classe)