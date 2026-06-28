# Copy elision

Quando certos critérios são atendidos, a criação de um objeto de classe a partir de um objeto fonte do mesmo tipo (ignorando a qualificação cv) pode ser omitida, mesmo que o construtor selecionado e/ou o destrutor para o objeto tenham efeitos colaterais. Essa elisão da criação de objetos é chamada de _copy elision_ .

### Explicação

A copy elision é permitida nas seguintes circunstâncias (que podem ser combinadas para eliminar múltiplas cópias):

  * Em uma [instrução return](<#/doc/language/return>) em uma função com um tipo de retorno de classe, quando o operando é o nome de um objeto não-volátil obj com [duração de armazenamento automática](<#/doc/language/storage_duration>) (que não seja um parâmetro de função ou um parâmetro de [handler](<#/doc/language/catch>)), a [inicialização por cópia](<#/doc/language/copy_initialization>) do objeto resultado pode ser omitida construindo obj diretamente no objeto resultado da chamada de função. Esta variante de copy elision é conhecida como _otimização de valor de retorno nomeado_ (NRVO).

  * Quando um objeto de classe target é inicializado por cópia com um objeto de classe temporário obj que não foi vinculado a uma referência, a inicialização por cópia pode ser omitida construindo obj diretamente em target. Esta variante de copy elision é conhecida como _otimização de valor de retorno não nomeado_ (URVO). (Desde C++17), URVO é obrigatória e não é mais considerada uma forma de copy elision; veja abaixo.

| (até C++17)

  * Em uma [expressão throw](<#/doc/language/throw>), quando o operando é o nome de um objeto não-volátil obj com duração de armazenamento automática (que não seja um parâmetro de função ou um parâmetro de handler) que pertence a um [escopo](<#/doc/language/scope>) que não contém o [bloco try](<#/doc/language/try>) mais interno (se existir), a inicialização por cópia do objeto de exceção pode ser omitida construindo obj diretamente no objeto de exceção.
  * Em um [handler](<#/doc/language/catch>), a inicialização por cópia do argumento do handler pode ser omitida tratando o parâmetro do handler como um alias para o objeto de exceção se o significado do programa permanecer inalterado, exceto pela execução de construtores e destrutores para o argumento do handler.

| (desde C++11)

  * Em [coroutines](<#/doc/language/coroutines>), uma cópia de um parâmetro de coroutine pode ser omitida. Neste caso, as referências a essa cópia são substituídas por referências ao parâmetro correspondente se o significado do programa permanecer inalterado, exceto pela execução de um construtor e destrutor para o objeto de cópia do parâmetro.

| (desde C++20)

Quando a copy elision ocorre, a implementação trata a origem e o destino da inicialização omitida como simplesmente duas maneiras diferentes de se referir ao mesmo objeto.

A destruição ocorre no último dos momentos em que os dois objetos teriam sido destruídos sem a otimização. | (até C++11)
---|---
Se o primeiro parâmetro do construtor selecionado for uma rvalue reference para o tipo do objeto, a destruição desse objeto ocorre quando o target teria sido destruído. Caso contrário, a destruição ocorre no último dos momentos em que os dois objetos teriam sido destruídos sem a otimização. | (desde C++11)

### Semântica de Prvalue ("copy elision garantida")

(Desde C++17), um prvalue não é materializado até que seja necessário, e então é construído diretamente no armazenamento de seu destino final. Isso às vezes significa que, mesmo quando a sintaxe da linguagem sugere visualmente uma cópia/movimentação (por exemplo, [inicialização por cópia](<#/doc/language/copy_initialization>)), nenhuma cópia/movimentação é realizada — o que significa que o tipo não precisa ter um construtor de cópia/movimentação acessível. Exemplos incluem:

  * Inicializando o objeto retornado em uma [instrução return](<#/doc/language/return>), quando o operando é um [prvalue](<#/doc/language/value_category>) do mesmo tipo de classe (ignorando [qualificação cv](<#/doc/language/cv>)) que o tipo de retorno da função:

```cpp
    T f()
    {
        return U(); // constrói um temporário do tipo U,
                    // então inicializa o T retornado a partir do temporário
    }
    T g()
    {
        return T(); // constrói o T retornado diretamente; sem movimentação
    }
```

     O destrutor do tipo retornado deve ser acessível no ponto da instrução return e não-deletado, mesmo que nenhum objeto T seja destruído.

  * Na inicialização de um objeto, quando a expressão inicializadora é um [prvalue](<#/doc/language/value_category>) do mesmo tipo de classe (ignorando [qualificação cv](<#/doc/language/cv>)) que o tipo da variável:

```cpp
    T x = T(T(f())); // x é inicializado diretamente pelo resultado de f(); sem movimentação
```

    Isso só pode ser aplicado quando se sabe que o objeto sendo inicializado não é um subobjeto potencialmente sobreposto:
```cpp
    struct C { /* ... */ };
    C f();
    
    struct D;
    D g();
    
    struct D : C
    {
        D() : C(f()) {}    // sem elisão ao inicializar um subobjeto de classe base
        D(int) : D(g()) {} // sem elisão porque o objeto D sendo inicializado pode
                           // ser um subobjeto de classe base de alguma outra classe
    };
```

Nota: Esta regra não especifica uma otimização, e o Padrão não a descreve formalmente como "copy elision" (porque nada está sendo elidido). Em vez disso, a especificação da linguagem central do C++17 para [prvalues](<#/doc/language/value_category>) e [temporários](<#/doc/language/implicit_cast>) é fundamentalmente diferente da das revisões anteriores do C++: não há mais um temporário para copiar/movimentar. Outra maneira de descrever a mecânica do C++17 é "passagem de valor não materializado" ou "materialização temporária adiada": prvalues são retornados e usados sem nunca materializar um temporário. | (desde C++17)

### Notas

A copy elision é a única forma permitida de otimização (até C++14) uma das duas formas permitidas de otimização, juntamente com [elisão e extensão de alocação](<#/doc/language/new>) (desde C++14), que pode alterar efeitos colaterais observáveis. Como alguns compiladores não realizam a copy elision em todas as situações em que é permitida (por exemplo, em modo de depuração), programas que dependem dos efeitos colaterais de construtores e destrutores de cópia/movimentação não são portáveis.

Em uma instrução return ou uma expressão throw, se o compilador não puder realizar a copy elision, mas as condições para a copy elision forem atendidas, ou seriam atendidas exceto pelo fato de que a origem é um parâmetro de função, o compilador tentará usar o move constructor mesmo que o operando de origem seja designado por um lvalue (até C++23) o operando de origem será tratado como um rvalue (desde C++23); veja [instrução return](<#/doc/language/return>) para detalhes. Em [expressão constante](<#/doc/language/constant_expression>) e [inicialização constante](<#/doc/language/constant_initialization>), a copy elision nunca é realizada.
```cpp
    struct A
    {
        void* p;
        constexpr A() : p(this) {}
        A(const A&); // Desabilita copiabilidade trivial
    };
    
    constexpr A a;  // OK: a.p aponta para a
    
    constexpr A f()
    {
        A x;
        return x;
    }
    constexpr A b = f(); // erro: b.p ficaria pendente e apontaria para o x dentro de f
    
    constexpr A c = A(); // (até C++17) erro: c.p ficaria pendente e apontaria para um temporário
                         // (desde C++17) OK: c.p aponta para c; nenhum temporário está envolvido
```

| (desde C++11)
---|---|---|---
Macro de teste de recurso | Valor | Padrão | Recurso
[`__cpp_guaranteed_copy_elision`](<#/doc/feature_test>) | [`201606L`](<#/>) | (C++17) | Copy elision garantida através de [categorias de valor](<#/doc/language/value_category>) simplificadas

### Exemplo

Execute este código
```cpp
    #include <iostream>
    
    struct Noisy
    {
        Noisy() { std::cout << "constructed at " << this << '\n'; }
        Noisy(const Noisy&) { std::cout << "copy-constructed\n"; }
        Noisy(Noisy&&) { std::cout << "move-constructed\n"; }
        ~Noisy() { std::cout << "destructed at " << this << '\n'; }
    };
    
    Noisy f()
    {
        Noisy v = Noisy(); // (até C++17) copy elision inicializando v a partir de um temporário;
                           //               o move constructor pode ser chamado
                           // (desde C++17) "copy elision garantida"
        return v; // copy elision ("NRVO") de v para o objeto resultado;
                  // o move constructor pode ser chamado
    }
    
    void g(Noisy arg)
    {
        std::cout << "&arg = " << &arg << '\n';
    }
    
    int main()
    {
        Noisy v = f(); // (até C++17) copy elision inicializando v a partir do resultado de f()
                       // (desde C++17) "copy elision garantida"
    
        std::cout << "&v = " << &v << '\n';
    
        g(f()); // (até C++17) copy elision inicializando arg a partir do resultado de f()
                // (desde C++17) "copy elision garantida"
    }
```

Saída possível:
```
    constructed at 0x7fffd635fd4e
    &v = 0x7fffd635fd4e
    constructed at 0x7fffd635fd4f
    &arg = 0x7fffd635fd4f
    destructed at 0x7fffd635fd4f
    destructed at 0x7fffd635fd4e
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 1967](<https://cplusplus.github.io/CWG/issues/1967.html>) | C++11 | quando a copy elision é feita usando um move constructor, o tempo de vida do objeto movido ainda era considerado | não considerado
[CWG 2426](<https://cplusplus.github.io/CWG/issues/2426.html>) | C++17 | destrutor não era exigido ao retornar um prvalue | destrutor é potencialmente invocado
[CWG 2930](<https://cplusplus.github.io/CWG/issues/2930.html>) | C++98 | apenas operações de cópia(/movimentação) podiam ser elididas, mas um construtor não-cópia(/movimentação) pode ser selecionado por inicialização por cópia | elide qualquer construção de objeto de inicializações por cópia relacionadas

### Veja também

  * [inicialização por cópia](<#/doc/language/copy_initialization>)
  * [copy constructor](<#/doc/language/copy_constructor>)
  * [move constructor](<#/doc/language/move_constructor>)
