# especificador constinit (desde C++20)

*   `constinit` \- afirma que uma variável possui inicialização estática, isto é, [inicialização zero](<#/doc/language/zero_initialization>) e [inicialização constante](<#/doc/language/constant_initialization>), caso contrário, o programa é malformado.

### Explicação

O especificador constinit declara uma variável com [duração de armazenamento](<#/doc/language/storage_duration>) estática ou de thread.

O especificador constinit também pode ser aplicado a declarações de [structured binding](<#/doc/language/structured_binding>). Neste caso, constinit também é aplicado à [variável com nome único](<#/doc/language/structured_binding>) introduzida pela declaração. | (desde C++26)

Se uma variável é declarada com constinit, sua [declaração de inicialização](<#/doc/language/initialization>) deve ser aplicada com constinit. Se uma variável declarada com constinit possui [inicialização dinâmica](<#/doc/language/initialization>) (mesmo que seja [realizada como inicialização estática](<#/doc/language/initialization>)), o programa é malformado.

Se nenhuma declaração constinit for alcançável no ponto da declaração de inicialização, o programa é malformado, sem diagnóstico exigido.

constinit não pode ser usado junto com constexpr. Quando a variável declarada é uma referência, constinit é equivalente a constexpr. Quando a variável declarada é um objeto, constexpr exige que o objeto tenha inicialização estática e destruição constante e torna o objeto const-qualified; no entanto, constinit não exige destruição constante e const-qualification. Como resultado, um objeto de um tipo que possui construtores constexpr e nenhum destrutor constexpr (por exemplo, [std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;T&gt;) pode ser declarado com constinit, mas não com constexpr.
```cpp
    const char* g() { return "dynamic initialization"; }
    constexpr const char* f(bool p) { return p ? "constant initializer" : g(); }
    
    constinit const char* c = f(true);     // OK
    // constinit const char* d = f(false); // error
```

constinit também pode ser usado em uma declaração não-inicializadora para informar ao compilador que uma variável thread_local já está inicializada, [reduzindo a sobrecarga](<#/doc/language/storage_duration>) que de outra forma seria incorrida por uma variável de guarda oculta.
```cpp
    extern thread_local constinit int x;
    int f() { return x; } // no check of a guard variable needed
```

### Notas

Feature-test macro | Valor | Padrão | Feature
---|---|---|---
[`__cpp_constinit`](<#/doc/feature_test>) | [`201907L`](<#/>) | (C++20) | `constinit`

### Palavras-chave

[`constinit`](<#/doc/keyword/constinit>)

### Exemplo

Execute este código
```cpp
    #include <cassert>
    
    constexpr int square(int i)
    {
        return i * i;
    }
    
    int twice(int i)
    {
        return i + i;
    }
    
    constinit int sq = square(2);    // OK: initialization is done at compile time
    // constinit int x_x = twice(2); // Error: compile time initializer required
    
    int square_4_gen()
    {
        static constinit int pow = square(4);
    
        // constinit int prev = pow; // Error: constinit can only be applied to a
                                     // variable with static or thread storage duration
        int prev = pow;
        pow = pow * pow;
        return prev;
    }
    
    int main()
    {
        assert(sq == 4);
        sq = twice(1); // Unlike constexpr this value can be changed later at runtime
        assert(sq == 2);
    
        assert(square_4_gen() == 16);
        assert(square_4_gen() == 256);
        assert(square_4_gen() == 65536);
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 2543](<https://cplusplus.github.io/CWG/issues/2543.html>) | C++20 | o comportamento era incerto se a variável declarada com constinit é inicializada dinamicamente como parte da inicialização estática | o programa é malformado neste caso

### Veja também

[especificador `consteval`](<#/doc/language/consteval>)(C++20) | especifica que uma função é uma _função imediata_, isto é, cada chamada à função deve ocorrer em uma avaliação constante
---|---
[especificador `constexpr`](<#/doc/language/constexpr>)(C++11) | especifica que o valor de uma variável ou função pode ser computado em tempo de compilação
[expressão constante](<#/doc/language/constant_expression>) | define uma [expressão](<#/doc/language/expressions>) que pode ser avaliada em tempo de compilação
[inicialização constante](<#/doc/language/constant_initialization>) | define os valores iniciais das variáveis [estáticas](<#/doc/language/storage_duration>) para uma constante em tempo de compilação
[inicialização zero](<#/doc/language/zero_initialization>) | define o valor inicial de um objeto como zero
\*\[Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso dado.
\*\[Padrão]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra aquela revisão