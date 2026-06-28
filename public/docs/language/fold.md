# Expressões de fold (desde C++17)

Reduz ([faz fold](<https://en.wikipedia.org/wiki/Fold_\(higher-order_function\)> "enwiki:Fold \(higher-order function\)")) um [pack](<#/doc/language/parameter_pack>) sobre um operador binário.

### Sintaxe

---
`(` pack op `... )` | (1) |
---|---|---
`( ...` op pack `)` | (2) |
`(` pack op `...` op init `)` | (3) |
`(` init op `...` op pack `)` | (4) |

1) Fold unário à direita.

2) Fold unário à esquerda.

3) Fold binário à direita.

4) Fold binário à esquerda.

- **op** — qualquer um dos 32 operadores _binários_ a seguir: + - * / % ^ & | = < > << >> += -= *= /= %= ^= &= |= <<= >>= == != <= >= && || , .* ->*. Em um fold binário, ambos os operadores devem ser os mesmos.
- **pack** — uma expressão que contém um [pack](<#/doc/language/parameter_pack>) não expandido e não contém um operador com [precedência](<#/doc/language/operator_precedence>) menor que cast no nível superior (formalmente, uma cast-expression)
- **init** — uma expressão que não contém um [pack](<#/doc/language/parameter_pack>) não expandido e não contém um operador com [precedência](<#/doc/language/operator_precedence>) menor que cast no nível superior (formalmente, uma cast-expression)

Note que os parênteses de abertura e fechamento são uma parte obrigatória da expressão de fold.

### Explicação

A instanciação de uma _expressão de fold_ expande a expressão e da seguinte forma:

1) Fold unário à direita `(E` op `...)` torna-se `(E1` op `(`... op `(EN-1` op `EN)))`

2) Fold unário à esquerda `(...` op `E)` torna-se `(((E1` op `E2)` op ...`)` op `EN)`

3) Fold binário à direita `(E` op `...` op `I)` torna-se `(E1` op `(`... op `(EN−1` op `(EN` op `I))))`

4) Fold binário à esquerda `(I` op `...` op `E)` torna-se `((((I` op `E1)` op `E2)` op ...`)` op `EN)`

(onde `N` é o número de elementos na expansão do pack)

Por exemplo,
```cpp
    template<typename... Args>
    bool all(Args... args) { return (... && args); }
    
    bool b = all(true, true, true, false);
    // dentro de all(), o fold unário à esquerda expande-se como
    //  return ((true && true) && true) && false;
    // b é false
```

Quando um fold unário é usado com uma expansão de pack de comprimento zero, apenas os seguintes operadores são permitidos:

1) AND lógico (&&). O valor para o pack vazio é true.

2) OR lógico (||). O valor para o pack vazio é false.

3) O operador vírgula (,). O valor para o pack vazio é void().

### Observações

Se a expressão usada como init ou como pack tiver um operador com [precedência](<#/doc/language/operator_precedence>) abaixo de cast no nível superior, ela deve ser parentesizada:
```cpp
    template<typename... Args>
    int sum(Args&&... args)
    {
    //  return (args + ... + 1 * 2);   // Erro: operador com precedência abaixo de cast
        return (args + ... + (1 * 2)); // OK
    }
```

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_fold_expressions`](<#/doc/feature_test>) | [`201603L`](<#/>) | (C++17) | [Expressões de fold](<#/doc/language/fold>)

### Exemplo

Execute este código
```cpp
    #include <climits>
    #include <concepts>
    #include <cstdint>
    #include <iostream>
    #include <limits>
    #include <type_traits>
    #include <utility>
    #include <vector>
    
    // Uso básico, fazendo fold de argumentos variádicos sobre operator<< 
    template<typename... Args>
    void printer(Args&&... args)
    {
        (std::cout << ... << args) << '\n';
    }
    
    // Fazendo fold de uma expressão que usa o pack diretamente sobre operator,
    template<typename... Ts>
    void print_limits()
    {
        ((std::cout << +std::numeric_limits<Ts>::max() << ' '), ...) << '\n';
    }
    
    // Tanto um fold sobre operator&& usando o pack
    // quanto sobre operator, usando os argumentos variádicos
    template<typename T, typename... Args>
    void push_back_vec(std::vector<T>& v, Args&&... args)
    {
        static_assert((std::is_constructible_v<T, Args&&> && ...));
        (v.push_back(std::forward<Args>(args)), ...);
    }
    
    // Usando uma sequência de inteiros para executar uma expressão
    // N vezes fazendo fold de uma lambda sobre operator,
    template<class T, std::size_t... dummy_pack>
    constexpr T bswap_impl(T i, std::index_sequence<dummy_pack...>)
    {
        T low_byte_mask = static_cast<unsigned char>(-1);
        T ret{};
        ([&]
        {
            (void)dummy_pack;
            ret <<= CHAR_BIT;
            ret |= i & low_byte_mask;
            i >>= CHAR_BIT;
        }(), ...);
        return ret;
    }
    
    constexpr auto bswap(std::unsigned_integral auto i)
    {
        return bswap_impl(i, std::make_index_sequence<sizeof(i)>{});
    }
    
    int main()
    {
        printer(1, 2, 3, "abc");
        print_limits<uint8_t, uint16_t, uint32_t>();
    
        std::vector<int> v;
        push_back_vec(v, 6, 2, 45, 12);
        push_back_vec(v, 1, 2, 9);
        for (int i : v)
            std::cout << i << ' ';
        std::cout << '\n';
    
        static_assert(bswap<std::uint16_t>(0x1234u) == 0x3412u);
        static_assert(bswap<std::uint64_t>(0x0123456789abcdefull) == 0xefcdab8967452301ULL);
    }
```

Saída:
```
    123abc
    255 65535 4294967295 
    6 2 45 12 1 2 9
```

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

    

  * 7.5.6 Expressões de fold [expr.prim.fold]

  * Padrão C++20 (ISO/IEC 14882:2020):

    

  * 7.5.6 Expressões de fold [expr.prim.fold]

  * Padrão C++17 (ISO/IEC 14882:2017):

    

  * 8.1.6 Expressões de fold [expr.prim.fold]

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 2611](<https://cplusplus.github.io/CWG/issues/2611.html>) | C++17 | os resultados da expansão das expressões de fold não eram envoltos em parênteses | envoltos em parênteses