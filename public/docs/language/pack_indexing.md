# Indexação de Pack (desde C++26)

Acessa o elemento de um [pack](<#/doc/language/parameter_pack>) em um índice especificado.

### Sintaxe

---
id-expression `...[` expression `]` | (1) |
---|---|---
typedef-name `...[` expression `]` | (2) |

1) Pack indexing expression

2) Pack indexing specifier

- **typedef-name** — um [identificador](<#/doc/language/name>) ou um [simple-template-id](<#/doc/language/templates>) que nomeia um pack
- **id-expression** — uma [id-expression](<#/doc/language/expressions>) que nomeia um pack
- **expression** — uma [converted constant expression](<#/doc/language/constant_expression>) I do tipo [std::size_t](<#/doc/types/size_t>) designada como índice onde I está dentro do intervalo `[`​0​`, `sizeof...(P)`)` para algum pack P na indexação de pack

### Explicação

A indexação de pack é uma _pack expansion_ do pack não expandido seguido por uma elipse e um índice dentro do subscrito. Existem dois tipos de indexação de pack: pack indexing expression e pack indexing specifier.

Seja `P` um pack não vazio contendo `P0, P1, ..., Pn-1` e `I` um índice válido, a instanciação da expansão `P...[I]` resulta no elemento do pack `PI` de `P`.

Indexar um pack com um índice `I` que não seja uma non-constant expression não é permitido.
```cpp
    int runtime_idx();
    
    void bar(auto... args)
    {
        auto a = args...[0];
        const int n = 1;
        auto b = args...[n];
        int m = 2;
        auto c = args...[m]; // error: 'm' is not a constant expression
        auto d = args...[runtime_idx()]; // error: 'runtime_idx()' is not a constant expression
    }
```

Indexar um pack de template template parameters não é possível.
```cpp
    template <template <typename...> typename... Temps>
    using A = Temps...[0]<>; // error: 'Temps' is a pack of template template parameters
    
    template <template <typename...> typename... Temps>
    using B = Temps<>...[0]; // error: 'Temps<>' doesn't denote pack name 
                             // although it is a simple-template-id
```

### Pack indexing expression

---
id-expression `...[` expression `]`

Pack indexing expression denota a _id-expression_, a expressão do elemento do pack `PI`. A id-expression deve ser introduzida pela declaração de:

  * [pack de parâmetro de template não-tipo](<#/doc/language/parameter_pack>),
  * [pack de parâmetro de função](<#/doc/language/parameter_pack>),
  * [pack de captura de inicialização de lambda](<#/doc/language/lambda>), ou
  * [pack de structured binding](<#/doc/language/structured_binding>).

```cpp
    template <std::size_t I, typename... Ts>
    constexpr auto element_at(Ts... args)
    {
        // 'args' introduced in function parameter pack declaration
        return args...[I];
    }
    
    static_assert(element_at<0>(3, 5, 9) == 3);
    static_assert(element_at<2>(3, 5, 9) == 9);
    static_assert(element_at<3>(3, 5, 9) == 4); // error:  out of bounds
    static_assert(element_at<0>() == 1); // error: out of bounds, empty pack
    
    template <std::size_t I, typename Tup>
    constexpr auto structured_binding_element_at(Tup tup)
    {
        auto [...elems] = tup;
        // 'elems' introduced in structured binding pack declaration
        return elems...[I];
    }
    
    struct A { bool a; int b; };
    
    static_assert(structured_binding_element_at<0>(A {true, 4}) == true);
    static_assert(structured_binding_element_at<1>(A {true, 4}) == 4);
    
    // 'Vals' introduced in non-type template parameter pack declaration
    template <std::size_t I, std::size_t... Vals>
    constexpr std::size_t double_at = Vals...[I] * 2; // OK
    
    template <std::size_t I, typename... Args>
    constexpr auto foo(Args... args)
    {
        return ...members = args
        {
            // 'members' introduced in lambda init-capture pack
            return members...[I] + op;
        };
    }
    
    static_assert(foo<0>(4, "Hello", true)(5) == 9);
    static_assert(foo<1>(3, std::string("C++"))("26") == "C++26");
```

Indexar packs de expressões complexas que não sejam id-expressions não é permitido.
```cpp
    template <std::size_t I, auto... Vals>
    constexpr auto identity_at = (Vals)...[I]; // error
    // use 'Vals...[I]' instead
    
    template <std::size_t I, std::size_t... Vals>
    constexpr std::size_t triple_at = (Vals * 3)...[I]; // error
    // use 'Vals...[I] * 3' instead
    
    template <std::size_t I, typename... Args>
    constexpr decltype(auto) get(Args&&... args) noexcept
    {
        return std::forward<Args>(args)...[I]; // error
        // use 'std::forward<Args...[I]>(args...[I])' instead
    }
```

Aplicar [`decltype`](<#/doc/language/decltype>) a uma pack indexing expression é o mesmo que aplicar [`decltype`](<#/doc/language/decltype>) a uma id-expression.
```cpp
    void f() 
    {
        
        {
            using T0 = decltype(args...[0]);   // 'T0' is 'double'
            using T1 = decltype((args...[0])); // 'T1' is 'double&'
        }(3.14);
    }
```

### Pack indexing specifier

---
typedef-name `...[` expression `]`

Pack indexing specifier denota o _computed-type-specifier_, o tipo do elemento do pack `PI`. O typedef-name deve ser introduzido pela declaração de um [pack de parâmetro de template de tipo](<#/doc/language/parameter_pack>).
```cpp
    template <typename... Ts>
    using last_type_t = Ts...[sizeof...(Ts) - 1];
    
    static_assert(std::is_same_v<last_type_t<>, int>); // error: out of bounds
    static_assert(std::is_same_v<last_type_t<int>, int>);
    static_assert(std::is_same_v<last_type_t<bool, char>, char>);
    static_assert(std::is_same_v<last_type_t<float, int, bool*>, bool*>);
```

Pack indexing specifier pode aparecer como:

  * um [simple type specifier](<#/doc/language/declarations>),
  * um [base class specifier](<#/doc/language/derived_class>),
  * um [nested name specifier](<#/doc/language/name>), ou
  * o [tipo de uma chamada explícita de destrutor](<#/doc/language/name>).

Pack indexing specifier pode ser usado em listas de parâmetros de função ou construtor para estabelecer [non-deduced contexts](<#/doc/language/template_argument_deduction>) na dedução de argumentos de template.
```cpp
    template <typename...>
    struct type_seq {};
    
    template <typename... Ts>
    auto f(Ts...[0] arg, type_seq<Ts...>)
    {
        return arg;
    }
    
    // OK: "Hello" is implicitly converted to 'std::string_view'
    std::same_as<std::string_view> auto a = f("Hello", type_seq<std::string_view>{});
    
    // Error: "Ok" is not convertible to 'int'
    std::same_as<int> auto b = f("Ok", type_seq<int, const char*>{});
```

### Notas

Antes do C++26, `Ts...[N]` era uma sintaxe válida para declarar um pack de parâmetro de função de arrays sem nome de tamanho N, onde os tipos dos parâmetros eram ajustados para ponteiros. Desde o C++26, `Ts...[1]` é interpretado como um pack indexing specifier, o que mudaria o comportamento abaixo para #2. Para preservar o primeiro comportamento, o pack de parâmetro de função deve ser nomeado, ou ajustado manualmente para um pack de tipos de ponteiro.
```cpp
    template <typename... Ts>
    void f(Ts... [1]);
    
    template <typename... Ts>
    void g(Ts... args[1]);
    
    template <typename... Ts>
    void h(Ts*...); // clearer but more permissive: Ts... can contain cv void or function types
    
    void foo() 
    {
        f<char, bool>(nullptr, nullptr);
        // behavior #1 (before C++26):
        //  calls void 'f<char, bool>(char*, bool*)' (aka 'f<char, bool>(char[1], bool[1])')
        // behavior #2 (since C++26): 
        //  error: supposedly called 'void f<char, bool>(bool)'
        //  but provided with 2 arguments instead of 1
    
        g<char, bool>(nullptr, nullptr);
        // calls 'g<char, bool>(char*, bool*)' (aka 'g<char, bool>(char[1], bool[1])')
    
        h<char, bool>(nullptr, nullptr);
        // calls 'h<char, bool>(char*, bool*)'
    }
```

Macro de teste de funcionalidade | Valor | Padrão | Funcionalidade
---|---|---|---
[`__cpp_pack_indexing`](<#/doc/feature_test>) | [`202311L`](<#/>) | (C++26) | [Indexação de Pack](<#/doc/language/pack_indexing>)

### Exemplo

Execute este código
```cpp
    #include <tuple>
    
    template <std::size_t... Indices, typename Decomposable>
    constexpr auto splice(Decomposable d)
    {
        auto [...elems] = d;
        return std::make_tuple(elems...[Indices]...);
    }
    
    struct Point
    {
        int x;
        int y;
        int z;
    };
    
    int main() 
    {
        constexpr Point p { .x = 1, .y = 4, .z = 3 };
        static_assert(splice<2, 1, 0>(p) == std::make_tuple(3, 4, 1));
        static_assert(splice<1, 1, 0, 0>(p) == std::make_tuple(4, 4, 1, 1));
    }
```