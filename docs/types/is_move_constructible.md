# std::is_move_constructible, std::is_trivially_move_constructible, std::is_nothrow_move_constructible

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct is_move_constructible;
template< class T >
struct is_trivially_move_constructible;
template< class T >
struct is_nothrow_move_constructible;
Trait de tipo
`T` é um tipo referenciável
(1)
(2)
(3)
```

Se `T` não for um tipo completo, (possivelmente cv-qualificado) void, ou um array de limite desconhecido, o comportamento é indefinido.

Se uma instanciação de um template acima depender, direta ou indiretamente, de um tipo incompleto, e essa instanciação pudesse produzir um resultado diferente se esse tipo fosse hipoteticamente completado, o comportamento é indefinido.

Se o programa adicionar especializações para qualquer um dos templates descritos nesta página, o comportamento é indefinido.

### Templates de variáveis auxiliares

```cpp
template< class T >
inline constexpr bool is_move_constructible_v =
is_move_constructible<T>::value;  // (desde C++17)
template< class T >
inline constexpr bool is_trivially_move_constructible_v =
is_trivially_move_constructible<T>::value;  // (desde C++17)
template< class T >
inline constexpr bool is_nothrow_move_constructible_v =
is_nothrow_move_constructible<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se `T` for move-constructible, false caso contrário
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
    struct is_move_constructible :
        std::is_constructible<T, typename std::add_rvalue_reference<T>::type> {};
    
    template<class T>
    struct is_trivially_move_constructible :
        std::is_trivially_constructible<T, typename std::add_rvalue_reference<T>::type> {};
    
    template<class T>
    struct is_nothrow_move_constructible :
        std::is_nothrow_constructible<T, typename std::add_rvalue_reference<T>::type> {};
```

---

### Notas

Tipos sem um construtor de movimento, mas com um construtor de cópia que aceita argumentos `const T&`, satisfazem `std::is_move_constructible`.

Construtores de movimento são geralmente `noexcept`, pois, caso contrário, são inutilizáveis em qualquer código que forneça garantia forte de exceção.

Em muitas implementações, `std::is_nothrow_move_constructible` também verifica se o destrutor lança exceções porque é efetivamente `noexcept(T(arg))`. O mesmo se aplica a `std::is_trivially_move_constructible`, que, nessas implementações, também exige que o destrutor seja trivial: [GCC bug 51452](<https://gcc.gnu.org/bugzilla/show_bug.cgi?id=51452>), [LWG issue 2116](<https://cplusplus.github.io/LWG/issue2116>).

### Exemplo

Execute este código
```cpp
    #include <string>
    #include <type_traits>
    
    struct Ex1
    {
        std::string str; // membro tem um construtor de movimento não-trivial mas que não lança exceções
    };
    static_assert(std::is_move_constructible_v<Ex1>);
    static_assert(!std::is_trivially_move_constructible_v<Ex1>);
    static_assert(std::is_nothrow_move_constructible_v<Ex1>);
    
    struct Ex2
    {
        int n;
        Ex2(Ex2&&) = default; // trivial e que não lança exceções
    };
    static_assert(std::is_move_constructible_v<Ex2>);
    static_assert(std::is_trivially_move_constructible_v<Ex2>);
    static_assert(std::is_nothrow_move_constructible_v<Ex2>);
    
    struct NoMove1
    {
        // impede a declaração implícita do construtor de movimento padrão;
        // no entanto, a classe ainda é move-constructible porque seu
        // construtor de cópia pode se ligar a um argumento rvalue
        NoMove1(const NoMove1&) {}
    };
    static_assert(std::is_move_constructible_v<NoMove1>);
    static_assert(!std::is_trivially_move_constructible_v<NoMove1>);
    static_assert(!std::is_nothrow_move_constructible_v<NoMove1>);
    
    struct NoMove2
    {
        // Não é move-constructible, pois a referência lvalue
        // não pode se ligar ao argumento rvalue
        NoMove2(NoMove2&) {}
    };
    static_assert(!std::is_move_constructible_v<NoMove2>);
    static_assert(!std::is_trivially_move_constructible_v<NoMove2>);
    static_assert(!std::is_nothrow_move_constructible_v<NoMove2>);
    
    int main() {}
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2196](<https://cplusplus.github.io/LWG/issue2196>) | C++11 | o comportamento era incerto se T&& não pudesse ser formado | o valor produzido é false neste caso

### Veja também

[ is_constructibleis_trivially_constructibleis_nothrow_constructible](<#/doc/types/is_constructible>)(C++11)(C++11)(C++11) | verifica se um tipo possui um construtor para argumentos específicos
(template de classe)
[ is_default_constructibleis_trivially_default_constructibleis_nothrow_default_constructible](<#/doc/types/is_default_constructible>)(C++11)(C++11)(C++11) | verifica se um tipo possui um construtor padrão
(template de classe)
[ is_copy_constructibleis_trivially_copy_constructibleis_nothrow_copy_constructible](<#/doc/types/is_copy_constructible>)(C++11)(C++11)(C++11) | verifica se um tipo possui um construtor de cópia
(template de classe)
[ move_constructible](<#/doc/concepts/move_constructible>)(C++20) | especifica que um objeto de um tipo pode ser construído por movimento
(concept)
[ move](<#/doc/utility/move>)(C++11) | converte o argumento para um xvalue
(template de função)
[ move_if_noexcept](<#/doc/utility/move_if_noexcept>)(C++11) | converte o argumento para um xvalue se o construtor de movimento não lançar exceções
(template de função)