# especificador consteval (desde C++20)

*   `consteval` - especifica que uma função é uma _função imediata_, ou seja, toda chamada à função deve produzir uma constante em tempo de compilação

### Explicação

O especificador `consteval` declara uma função ou modelo de função como uma _função imediata_, ou seja, toda chamada [potencialmente avaliada](<#/doc/language/expressions>) à função deve (direta ou indiretamente) produzir uma [expressão constante](<#/doc/language/constant_expression>) em tempo de compilação.

Uma função imediata é uma [função constexpr](<#/doc/language/constexpr>), sujeita aos seus requisitos, conforme o caso. Assim como `constexpr`, um especificador `consteval` implica `inline`. No entanto, ele não pode ser aplicado a destrutores, funções de alocação ou funções de desalocação.

Uma declaração de função ou modelo de função que especifica `consteval` não pode também especificar `constexpr`, e quaisquer redeclarações dessa função ou modelo de função também devem especificar `consteval`.

Uma invocação [potencialmente avaliada](<#/doc/language/expressions>) de uma função imediata cujo escopo não-bloco mais interno não é um [escopo de parâmetro de função](<#/doc/language/scope>) de uma função imediata ou o ramo verdadeiro de uma [instrução if consteval](<#/doc/language/if>)(desde C++23) deve produzir uma expressão constante; tal invocação é conhecida como uma _invocação imediata_.
```cpp
    consteval int sqr(int n)
    {
        return n*n;
    }
    constexpr int r = sqr(100); // OK
    
    int x = 100;
    int r2 = sqr(x);            // Erro: A chamada não produz uma constante
    
    consteval int sqrsqr(int n)
    {
        return sqr(sqr(n));     // Não é uma expressão constante neste ponto, mas OK
    }
    
    constexpr int dblsqr(int n)
    {
        return 2 * sqr(n);      // Erro: A função envolvente não é consteval
                                // e sqr(n) não é uma constante
    }
```

Uma [expressão de identificador](<#/doc/language/name>) que denota uma função imediata só pode aparecer dentro de uma subexpressão de uma invocação imediata ou dentro de um _contexto de função imediata_ (ou seja, um contexto mencionado acima, no qual uma chamada a uma função imediata não precisa ser uma expressão constante). Um ponteiro ou referência para uma função imediata pode ser obtido, mas não pode escapar da avaliação de expressão constante:
```cpp
    consteval int f() { return 42; }
    consteval auto g() { return &f; }
    consteval int h(int (*p)() = g()) { return p(); }
    constexpr int r = h();  // OK
    constexpr auto e = g(); // malformado: um ponteiro para uma função imediata não é
                            // um resultado permitido de uma expressão constante
```

### Notas

```cpp
Macro de teste de recurso | Valor | Std | Recurso
`__cpp_consteval` | `201811L` | (C++20) | Funções imediatas
`202211L`  // (C++23)
(DR20) | Fazendo consteval propagar para cima
```

### Palavras-chave

[`consteval`](<#/doc/keyword/consteval>)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    
    // Esta função pode ser avaliada em tempo de compilação, se a entrada
    // for conhecida em tempo de compilação. Caso contrário, ela é executada em tempo de execução.
    constexpr unsigned factorial(unsigned n)
    {
        return n < 2 ? 1 : n * factorial(n - 1);
    }
    
    // Com consteval, garantimos que a função será avaliada em tempo de compilação.
    consteval unsigned combination(unsigned m, unsigned n)
    {
        return factorial(n) / factorial(m) / factorial(n - m);
    }
    
    static_assert(factorial(6) == 720);
    static_assert(combination(4, 8) == 70);
    
    int main(int argc, const char*[])
    {
        constexpr unsigned x{factorial(4)};
        std::cout << x << '\n';
    
        [[maybe_unused]]
        unsigned y = factorial(argc); // OK
    //  unsigned z = combination(argc, 7); // erro: 'argc' não é uma expressão constante
    }
```

Saída:
```
    24
```

### Veja também

[especificador `constexpr`](<#/doc/language/constexpr>)(C++11) | especifica que o valor de uma variável ou função pode ser computado em tempo de compilação
---|---
[especificador `constinit`](<#/doc/language/constinit>)(C++20) | afirma que uma variável possui inicialização estática, ou seja, [inicialização zero](<#/doc/language/zero_initialization>) e [inicialização constante](<#/doc/language/constant_initialization>)
[expressão constante](<#/doc/language/constant_expression>) | define uma [expressão](<#/doc/language/expressions>) que pode ser avaliada em tempo de compilação
\*\[Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso fornecido.
\*\[Std]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão