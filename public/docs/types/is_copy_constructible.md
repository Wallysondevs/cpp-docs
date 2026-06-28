# std::is_copy_constructible, std::is_trivially_copy_constructible, std::is_nothrow_copy_constructible

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct is_copy_constructible;
template< class T >
struct is_trivially_copy_constructible;
template< class T >
struct is_nothrow_copy_constructible;
Trait de tipo
`T` é um tipo referenciável
(1)
(2)
(3)
```

Se `T` não for um tipo completo, void (possivelmente cv-qualificado), ou um array de tamanho desconhecido, o comportamento é indefinido.

Se uma instanciação de um template acima depender, direta ou indiretamente, de um tipo incompleto, e essa instanciação pudesse produzir um resultado diferente se esse tipo fosse hipoteticamente completado, o comportamento é indefinido.

Se o programa adicionar especializações para qualquer um dos templates descritos nesta página, o comportamento é indefinido.

### Templates de variáveis auxiliares

```cpp
template< class T >
inline constexpr bool is_copy_constructible_v =
is_copy_constructible<T>::value;  // (desde C++17)
template< class T >
inline constexpr bool is_trivially_copy_constructible_v =
is_trivially_copy_constructible<T>::value;  // (desde C++17)
template< class T >
inline constexpr bool is_nothrow_copy_constructible_v =
is_nothrow_copy_constructible<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se `T` for copy-constructible, false caso contrário
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
    struct is_copy_constructible :
        std::is_constructible<T, typename std::add_lvalue_reference<
            typename std::add_const<T>::type>::type> {};
    
    template<class T>
    struct is_trivially_copy_constructible :
        std::is_trivially_constructible<T, typename std::add_lvalue_reference<
            typename std::add_const<T>::type>::type> {};
    
    template<class T>
    struct is_nothrow_copy_constructible :
        std::is_nothrow_constructible<T, typename std::add_lvalue_reference<
            typename std::add_const<T>::type>::type> {};
```

---

### Notas

Em muitas implementações, `is_nothrow_copy_constructible` também verifica se o destrutor lança exceções porque é efetivamente noexcept(T(arg)). O mesmo se aplica a `is_trivially_copy_constructible`, que, nessas implementações, também exige que o destrutor seja trivial: [GCC bug 51452](<https://gcc.gnu.org/bugzilla/show_bug.cgi?id=51452>), [LWG issue 2116](<https://cplusplus.github.io/LWG/issue2116>).

### Exemplo

Execute este código
```cpp
    #include <string>
    #include <type_traits>
    
    struct S1
    {
        std::string str; // member has a non-trivial copy constructor
    };
    static_assert(std::is_copy_constructible_v<S1>);
    static_assert(!std::is_trivially_copy_constructible_v<S1>);
    
    struct S2
    {
        int n;
        S2(const S2&) = default; // trivial and non-throwing
    };
    static_assert(std::is_trivially_copy_constructible_v<S2>);
    static_assert(std::is_nothrow_copy_constructible_v<S2>);
    
    struct S3
    {
        S3(const S3&) = delete; // explicitly deleted
    };
    static_assert(!std::is_copy_constructible_v<S3>);
    
    struct S4
    {
        S4(S4&) {}; // cannot bind const, hence not a copy-constructible
    };
    static_assert(!std::is_copy_constructible_v<S4>);
    
    int main() {}
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

RD | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 2196](<https://cplusplus.github.io/LWG/issue2196>) | C++11 | o comportamento era incerto se const T& não pudesse ser formado | o valor produzido é false neste caso

### Veja também

[ is_constructibleis_trivially_constructibleis_nothrow_constructible](<#/doc/types/is_constructible>)(C++11)(C++11)(C++11) | verifica se um tipo possui um construtor para argumentos específicos
(template de classe)
[ is_default_constructibleis_trivially_default_constructibleis_nothrow_default_constructible](<#/doc/types/is_default_constructible>)(C++11)(C++11)(C++11) | verifica se um tipo possui um construtor padrão
(template de classe)
[ is_move_constructibleis_trivially_move_constructibleis_nothrow_move_constructible](<#/doc/types/is_move_constructible>)(C++11)(C++11)(C++11) | verifica se um tipo pode ser construído a partir de uma referência rvalue
(template de classe)
[ copy_constructible](<#/doc/concepts/copy_constructible>)(C++20) | especifica que um objeto de um tipo pode ser copy constructed e move constructed
(concept)