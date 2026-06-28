# std::is_integral

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct is_integral;
```

`std::is_integral` é um [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>).

Verifica se `T` é um [tipo integral](<#/doc/language/type-id>). Fornece a constante membro `value` que é igual a `true` se `T` for do tipo `bool`, `char`, `char8_t`(desde C++20), `char16_t`, `char32_t`, `wchar_t`, `short`, `int`, `long`, `long long`, ou qualquer tipo inteiro estendido definido pela implementação, incluindo quaisquer variantes `signed`, `unsigned` e `cv-qualified`. Caso contrário, `value` é igual a `false`.

Se o programa adicionar especializações para `std::is_integral` ou `std::is_integral_v`, o comportamento é indefinido.

### Parâmetros de template

T  |  \-  |  um tipo a ser verificado

### Modelo de variável auxiliar

```cpp
template< class T >
constexpr bool is_integral_v = is_integral<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] |  true se `T` for um tipo integral, false caso contrário
(constante membro estática pública)

### Funções membro

operator bool |  converte o objeto para `bool`, retorna `value`
(função membro pública)
operator()(C++14) |  retorna `value`
(função membro pública)

### Tipos membro

Tipo  |  Definição
---|---
`value_type` |  bool
`type` |  [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>

### Possível implementação
```cpp
    // Nota: esta implementação usa recursos do C++20
    template<class T>
    struct is_integral : std::bool_constant<
        requires (T t, T* p, void (*f)(T)) // O parâmetro T* exclui tipos de referência
        {
            reinterpret_cast<T>(t); // Exclui tipos de classe
            f(0); // Exclui tipos de enumeração
            p + t; // Exclui tudo o que ainda não foi excluído, exceto tipos integrais
        }> {};
```

---

### Exemplo

Execute este código
```cpp
    #include <type_traits>

    static_assert
    (
        std::is_integral_v<float> == false &&
        std::is_integral_v<int*> == false &&
        std::is_integral_v<int> == true &&
        std::is_integral_v<const int> == true &&
        std::is_integral_v<bool> == true &&
        std::is_integral_v<char> == true
    );

    class A {};
    static_assert(std::is_integral_v<A> == false);

    struct B { int x:4; };
    static_assert(std::is_integral_v<B> == false);
    using BF = decltype(B::x); // bit-field's type
    static_assert(std::is_integral_v<BF> == true);

    enum E : int {};
    static_assert(std::is_integral_v<E> == false);

    template <class T>
    constexpr T same(T i)
    {
        static_assert(std::is_integral<T>::value, "Integral necessário.");
        return i;
    }
    static_assert(same('"') == 042);

    int main() {}
```

### Veja também

[ integral](<#/doc/concepts/integral>)(C++20) |  especifica que um tipo é um tipo integral
(conceito)
[ is_integer](<#/doc/types/numeric_limits/is_integer>)[static] |  identifica tipos inteiros
(constante membro estática pública de `std::numeric_limits<T>`)
[ is_floating_point](<#/doc/types/is_floating_point>)(C++11) |  verifica se um tipo é um tipo de ponto flutuante
(modelo de classe)
[ is_arithmetic](<#/doc/types/is_arithmetic>)(C++11) |  verifica se um tipo é um tipo aritmético
(modelo de classe)
[ is_enum](<#/doc/types/is_enum>)(C++11) |  verifica se um tipo é um tipo de enumeração
(modelo de classe)