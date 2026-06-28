# std::is_default_constructible, std::is_trivially_default_constructible, std::is_nothrow_default_constructible

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct is_default_constructible;
template< class T >
struct is_trivially_default_constructible;
template< class T >
struct is_nothrow_default_constructible;
```

1) Fornece a constante membro `value` igual a [std::is_constructible](<#/doc/types/is_constructible>)&lt;T&gt;::value.

2) Fornece a constante membro `value` igual a [std::is_trivially_constructible](<#/doc/types/is_constructible>)&lt;T&gt;::value.

3) Fornece a constante membro `value` igual a [std::is_nothrow_constructible](<#/doc/types/is_constructible>)&lt;T&gt;::value.

Se `T` não for um tipo completo, (possivelmente cv-qualificado) void, ou um array de tamanho desconhecido, o comportamento é indefinido.

Se uma instanciação de um template acima depender, direta ou indiretamente, de um tipo incompleto, e essa instanciação puder produzir um resultado diferente se esse tipo fosse hipoteticamente completado, o comportamento é indefinido.

Se o programa adicionar especializações para qualquer um dos templates descritos nesta página, o comportamento é indefinido.

### Templates de variáveis auxiliares

```cpp
template< class T >
inline constexpr bool is_default_constructible_v =
is_default_constructible<T>::value;  // (desde C++17)
template< class T >
inline constexpr bool is_trivially_default_constructible_v =
is_trivially_default_constructible<T>::value;  // (desde C++17)
template< class T >
inline constexpr bool is_nothrow_default_constructible_v =
is_nothrow_default_constructible<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se `T` for construível por padrão, false caso contrário
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
    struct is_default_constructible : std::is_constructible<T> {};
    
    template<class T>
    struct is_trivially_default_constructible : std::is_trivially_constructible<T> {};
    
    template<class T>
    struct is_nothrow_default_constructible : std::is_nothrow_constructible<T> {};
```

---

### Notas

Em muitas implementações, `std::is_nothrow_default_constructible` também verifica se o destrutor lança exceções porque é efetivamente noexcept(T()). O mesmo se aplica a `std::is_trivially_default_constructible`, que, nessas implementações, também exige que o destrutor seja trivial: [GCC bug 51452](<https://gcc.gnu.org/bugzilla/show_bug.cgi?id=51452>), [LWG issue 2116](<https://cplusplus.github.io/LWG/issue2116>).

std::is_default_constructible&lt;T&gt; não testa se T x; compilaria; ele tenta a [inicialização direta](<#/doc/language/direct_initialization>) com uma lista de argumentos vazia (veja [std::is_constructible](<#/doc/types/is_constructible>)). Assim, std::is_default_constructible_v&lt;const int&gt; e std::is_default_constructible_v&lt;const int[10]&gt; são true.

### Exemplo

Execute este código
```cpp
    #include <string>
    #include <type_traits>
    
    struct S1
    {
        std::string str; // member has a non-trivial default constructor
    };
    static_assert(std::is_default_constructible_v<S1> == true);
    static_assert(std::is_trivially_default_constructible_v<S1> == false);
    
    struct S2
    {
        int n;
        S2() = default; // trivial and non-throwing
    };
    static_assert(std::is_trivially_default_constructible_v<S2> == true);
    static_assert(std::is_nothrow_default_constructible_v<S2> == true);
    
    int main() {}
```

### Veja também

[ is_constructibleis_trivially_constructibleis_nothrow_constructible](<#/doc/types/is_constructible>)(C++11)(C++11)(C++11) | verifica se um tipo possui um construtor para argumentos específicos
(template de classe)
[ is_copy_constructibleis_trivially_copy_constructibleis_nothrow_copy_constructible](<#/doc/types/is_copy_constructible>)(C++11)(C++11)(C++11) | verifica se um tipo possui um construtor de cópia
(template de classe)
[ is_move_constructibleis_trivially_move_constructibleis_nothrow_move_constructible](<#/doc/types/is_move_constructible>)(C++11)(C++11)(C++11) | verifica se um tipo pode ser construído a partir de uma referência rvalue
(template de classe)
[ default_initializable](<#/doc/concepts/default_initializable>)(C++20) | especifica que um objeto de um tipo pode ser construído por padrão
(concept)