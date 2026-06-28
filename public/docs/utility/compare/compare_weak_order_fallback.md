# std::compare_weak_order_fallback

Definido no cabeçalho `[<compare>](<#/doc/header/compare>)`

```c
inline namespace /* unspecified */ {
inline constexpr /* unspecified */
compare_weak_order_fallback = /* unspecified */;
}
Assinatura da chamada
template< class T, class U >
requires /* see below */
constexpr std::weak_ordering
compare_weak_order_fallback( T&& t, U&& u ) noexcept(/* see below */);
```

Realiza comparação de três vias em [subexpressões](<#/doc/language/expressions>) t e u e produz um resultado do tipo [`std::weak_ordering`](<#/doc/utility/compare/weak_ordering>), mesmo que o operador `<=>` não esteja disponível.

Se `std::decay_t<T>` e `std::decay_t<U>` são do mesmo tipo, `std::compare_weak_order_fallback(t, u)` é [expressão-equivalente](<#/doc/language/expressions>) a:

  * `std::weak_order(t, u)`, se for uma expressão bem-formada; caso contrário,
  * `t == u ? std::weak_ordering::equivalent : t < u ? std::weak_ordering::less : std::weak_ordering::greater`, se as expressões `t == u` e `t < u` são ambas bem-formadas e cada um de `decltype(t == u)` e `decltype(t < u)` modela [`_boolean-testable_`](<#/doc/concepts/boolean-testable>), exceto que t e u são avaliados apenas uma vez.

Em todos os outros casos, `std::compare_weak_order_fallback(t, u)` é malformado, o que pode resultar em [falha de substituição](<#/doc/language/sfinae>) quando aparece no contexto imediato de uma instanciação de template.

### Objetos de ponto de customização

O nome `std::compare_weak_order_fallback` denota um _objeto de ponto de customização_, que é um [objeto de função](<#/doc/named_req/FunctionObject>) `const` de um tipo de classe [literal](<#/doc/named_req/LiteralType>) [`semiregular`](<#/doc/concepts/semiregular>). Para fins de exposição, a versão não qualificada por cv de seu tipo é denotada como `___compare_weak_order_fallback_fn_`.

Todas as instâncias de `___compare_weak_order_fallback_fn_` são iguais. Os efeitos de invocar diferentes instâncias do tipo `___compare_weak_order_fallback_fn_` com os mesmos argumentos são equivalentes, independentemente de a expressão que denota a instância ser um lvalue ou rvalue, e ser qualificada como `const` ou não (no entanto, uma instância qualificada como `volatile` não é obrigada a ser invocável). Assim, `std::compare_weak_order_fallback` pode ser copiado livremente e suas cópias podem ser usadas de forma intercambiável.

Dado um conjunto de tipos `Args...`, se `std::declval<Args>()...` atendem aos requisitos para argumentos de `std::compare_weak_order_fallback` acima, `___compare_weak_order_fallback_fn_` modela

  * [std::invocable](<#/doc/concepts/invocable>)<__compare_weak_order_fallback_fn, Args...>,
  * [std::invocable](<#/doc/concepts/invocable>)&lt;const __compare_weak_order_fallback_fn, Args...&gt;,
  * [std::invocable](<#/doc/concepts/invocable>)<__compare_weak_order_fallback_fn&, Args...>, e
  * [std::invocable](<#/doc/concepts/invocable>)&lt;const __compare_weak_order_fallback_fn&, Args...&gt;.

Caso contrário, nenhum operador de chamada de função de `___compare_weak_order_fallback_fn_` participa da resolução de sobrecarga.

### Exemplo

Execute este código
```cpp
    #include <compare>
    #include <iostream>
    
    // does not support <=>
    struct Rational_1
    {
        int num;
        int den; // > 0
    };
    
    inline constexpr bool operator<(Rational_1 lhs, Rational_1 rhs)
    {
        return lhs.num * rhs.den < rhs.num * lhs.den;
    }
    
    inline constexpr bool operator==(Rational_1 lhs, Rational_1 rhs)
    {
        return lhs.num * rhs.den == rhs.num * lhs.den;
    }
    
    // supports <=>
    struct Rational_2
    {
        int num;
        int den; // > 0
    };
    
    inline constexpr std::weak_ordering operator<=>(Rational_2 lhs, Rational_2 rhs)
    {
        return lhs.num * rhs.den <=> rhs.num * lhs.den;
    }
    
    inline constexpr bool operator==(Rational_2 lhs, Rational_2 rhs)
    {
        return lhs <=> rhs == 0;
    }
    
    void print(int id, std::weak_ordering value)
    {
        std::cout << id << ") ";
        if (value == 0)
            std::cout << "equal\n";
        else if (value < 0)
            std::cout << "less\n";
        else
            std::cout << "greater\n";
    }
    
    int main()
    {
        Rational_1 a{1, 2}, b{3, 4};
    //  print(0, a <=> b); // does not work
        print(1, std::compare_weak_order_fallback(a, b)); // works, defaults to < and ==
    
        Rational_2 c{6, 5}, d{8, 7};
        print(2, c <=> d); // works
        print(3, std::compare_weak_order_fallback(c, d)); // works
    
        Rational_2 e{2, 3}, f{4, 6};
        print(4, e <=> f); // works
        print(5, std::compare_weak_order_fallback(e, f)); // works
    }
```

Saída:
```
    1) less
    2) greater
    3) greater
    4) equal
    5) equal
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 2114](<https://cplusplus.github.io/LWG/issue2114>)
([P2167R3](<https://wg21.link/P2167R3>)) | C++20 | o mecanismo de fallback exigia apenas que os tipos de retorno fossem conversíveis para bool | restrições fortalecidas

### Veja também

[ weak_order](<#/doc/utility/compare/weak_order>)(C++20) | realiza comparação de 3 vias e produz um resultado do tipo `std::weak_ordering`
(objeto de ponto de customização)