# std::is_constructible, std::is_trivially_constructible, std::is_nothrow_constructible

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T, class... Args >
struct is_constructible;
template< class T, class... Args >
struct is_trivially_constructible;
template< class T, class... Args >
struct is_nothrow_constructible;
```

1) Se `T` é um tipo de objeto ou referência e a definição de variável T obj([std::declval](<#/doc/utility/declval>)&lt;Args&gt;()...); é bem-formada, fornece a constante membro `value` igual a true. Em todos os outros casos, `value` é false.
Para os propósitos desta verificação, a definição de variável nunca é interpretada como uma declaração de função, e o uso de [std::declval](<#/doc/utility/declval>) não é considerado um [odr-use](<#/doc/language/definition>). [Verificações de acesso](<#/doc/language/access>) são realizadas como se de um contexto não relacionado a `T` e a qualquer um dos tipos em `Args`. Apenas a validade do contexto imediato da definição de variável é considerada.

2) O mesmo que (1), mas a definição de variável não chama nenhuma operação que não seja trivial. Para os propósitos desta verificação, a chamada para [std::declval](<#/doc/utility/declval>) é considerada trivial.

3) O mesmo que (1), mas a definição de variável é `noexcept`.

Se `T` ou qualquer tipo no parameter pack `Args` não for um tipo completo, void (possivelmente cv-qualified), ou um array de limite desconhecido, o comportamento é indefinido.

Se uma instanciação de um template acima depender, direta ou indiretamente, de um tipo incompleto, e essa instanciação puder produzir um resultado diferente se esse tipo fosse hipoteticamente completado, o comportamento é indefinido.

Se o programa adicionar especializações para qualquer um dos templates descritos nesta página, o comportamento é indefinido.

### Templates de variáveis auxiliares

```cpp
template< class T, class... Args >
inline constexpr bool is_constructible_v =
is_constructible<T, Args...>::value;  // (desde C++17)
template< class T, class... Args >
inline constexpr bool is_trivially_constructible_v =
is_trivially_constructible<T, Args...>::value;  // (desde C++17)
template< class T, class... Args >
inline constexpr bool is_nothrow_constructible_v =
is_nothrow_constructible<T, Args...>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se `T` é construtível a partir de `Args...`, false caso contrário
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

### Notas

Em muitas implementações, `is_nothrow_constructible` também verifica se o destrutor lança exceções porque é efetivamente noexcept(T(arg)). O mesmo se aplica a `is_trivially_constructible`, que, nessas implementações, também exige que o destrutor seja trivial: [bug do GCC 51452](<https://gcc.gnu.org/bugzilla/show_bug.cgi?id=51452>) [problema LWG 2116](<https://cplusplus.github.io/LWG/issue2116>).

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <type_traits>
    
    class Foo
    {
        int v1;
        double v2;
    public:
        Foo(int n) : v1(n), v2() {}
        Foo(int n, double f) noexcept : v1(n), v2(f) {}
    };
    
    int main()
    {
        auto is =  { return (o ? "\t" "is " : "\t" "isn't "); };
        std::cout << "Foo ...\n"
                  << is(std::is_trivially_constructible_v<Foo, const Foo&>)
                  << "Trivially-constructible from const Foo&\n"
                  << is(std::is_trivially_constructible_v<Foo, int>)
                  << "Trivially-constructible from int\n"
                  << is(std::is_constructible_v<Foo, int>)
                  << "Constructible from int\n"
                  << is(std::is_nothrow_constructible_v<Foo, int>)
                  << "Nothrow-constructible from int\n"
                  << is(std::is_nothrow_constructible_v<Foo, int, double>)
                  << "Nothrow-constructible from int and double\n";
    }
```

Saída:
```
    Foo ...
            is Trivially-constructible from const Foo&
            isn't Trivially-constructible from int
            is Constructible from int
            isn't Nothrow-constructible from int
            is Nothrow-constructible from int and double
```

### Veja também

[ is_default_constructibleis_trivially_default_constructibleis_nothrow_default_constructible](<#/doc/types/is_default_constructible>)(desde C++11)(desde C++11)(desde C++11) | verifica se um tipo possui um construtor padrão
(template de classe)
[ is_copy_constructibleis_trivially_copy_constructibleis_nothrow_copy_constructible](<#/doc/types/is_copy_constructible>)(desde C++11)(desde C++11)(desde C++11) | verifica se um tipo possui um construtor de cópia
(template de classe)
[ is_move_constructibleis_trivially_move_constructibleis_nothrow_move_constructible](<#/doc/types/is_move_constructible>)(desde C++11)(desde C++11)(desde C++11) | verifica se um tipo pode ser construído a partir de uma referência rvalue
(template de classe)
[ constructible_from](<#/doc/concepts/constructible_from>)(C++20) | especifica que uma variável do tipo pode ser construída a partir de ou ligada a um conjunto de tipos de argumento
(concept)