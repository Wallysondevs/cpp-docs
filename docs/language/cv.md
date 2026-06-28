# qualificadores de tipo cv (const e volatile)

Aparecem em qualquer especificador de tipo, incluindo a decl-specifier-seq da [gramática de declaração](<#/doc/language/declarations>), para especificar a constância ou volatilidade do objeto sendo declarado ou do tipo sendo nomeado.

*   const - define que o tipo é _constante_.
*   volatile - define que o tipo é _volátil_.

### Explicação

Qualquer tipo (possivelmente [incompleto](<#/doc/language/type-id>)), exceto [tipo de função](<#/doc/language/functions>) ou [tipo de referência](<#/doc/language/reference>), é um tipo em um grupo dos quatro tipos distintos, mas relacionados, a seguir:

*   Versão _cv-não-qualificada_.
*   Versão _const-qualificada_.
*   Versão _volatile-qualificada_.
*   Versão _const-volatile-qualificada_.

Esses quatro tipos no mesmo grupo possuem os mesmos requisitos de [representação](<#/doc/language/objects>) e [alinhamento](<#/doc/language/objects>).

[Tipos de array](<#/doc/language/array>) são considerados como tendo a mesma qualificação cv que seus tipos de elemento.

#### Objetos const e volatile

Quando um objeto é criado pela primeira vez, os qualificadores cv usados (que podem fazer parte de uma decl-specifier-seq ou de um declarator em uma [declaração](<#/doc/language/declarations>), ou parte de um type-id em uma [new-expression](<#/doc/language/new>)) determinam a constância ou volatilidade do objeto, da seguinte forma:

*   Um _objeto const_ é

    *   um objeto cujo tipo é const-qualificado, ou
    *   um subobjeto não-[mutable](<#/doc/language/cv>) de um objeto const.

    Tal objeto não pode ser modificado: a tentativa de fazê-lo diretamente é um erro em tempo de compilação, e a tentativa de fazê-lo indiretamente (por exemplo, modificando o objeto const através de uma referência ou ponteiro para um tipo não-const) resulta em comportamento indefinido.

*   Um _objeto volatile_ é

    *   um objeto cujo tipo é volatile-qualificado,
    *   um subobjeto de um objeto volatile, ou
    *   um subobjeto [mutable](<#/doc/language/cv>) de um objeto const-volatile.

    Todo acesso (operação de leitura ou escrita, chamada de função membro, etc.) feito através de uma expressão glvalue de tipo volatile-qualificado é tratado como um efeito colateral visível para [fins de otimização](<#/doc/language/as_if>) (ou seja, dentro de um único thread de execução, acessos volatile não podem ser otimizados ou reordenados com outro efeito colateral visível que seja [sequenced-before](<#/doc/language/eval_order>) ou sequenced-after o acesso volatile. Isso torna objetos volatile adequados para comunicação com um [manipulador de sinal](<#/doc/utility/program/signal>), mas não com outro thread de execução, veja [std::memory_order](<#/doc/atomic/memory_order>)). Qualquer tentativa de acessar um objeto volatile através de um [glvalue](<#/doc/language/value_category>) de tipo não-volatile (por exemplo, através de uma referência ou ponteiro para um tipo não-volatile) resulta em comportamento indefinido.

*   Um _objeto const volatile_ é

    *   um objeto cujo tipo é const-volatile-qualificado,
    *   um subobjeto não-[mutable](<#/doc/language/cv>) de um objeto const volatile,
    *   um subobjeto const de um objeto volatile, ou
    *   um subobjeto volatile não-[mutable](<#/doc/language/cv>) de um objeto const.

    Comporta-se como um objeto const e como um objeto volatile.

Cada qualificador cv (const e volatile) pode aparecer no máximo uma vez em qualquer sequência de qualificadores cv. Por exemplo, const const e volatile const volatile não são sequências de qualificadores cv válidas.

### Especificador `mutable`

*   mutable - permite a modificação do membro da classe declarado mutable mesmo que o objeto que o contém seja declarado const (ou seja, o membro da classe é mutável).

Pode aparecer na declaração de [membros de classe](<#/doc/language/data_members>) não-estáticos de tipo não-referência e não-const:
```cpp
    class X
    {
        mutable const int* p; // OK
        mutable int* const q; // ill-formed
        mutable int&       r; // ill-formed
    };
```

mutable é usado para especificar que o membro não afeta o estado externamente visível da classe (como frequentemente usado para mutexes, caches de memo, avaliação preguiçosa e instrumentação de acesso).
```cpp
    class ThreadsafeCounter
    {
        mutable std::mutex m; // A "regra M&M": mutable e mutex andam juntos
        int data = 0;
    public:
        int get() const
        {
            std::lock_guard<std::mutex> lk(m);
            return data;
        }
    
        void inc()
        {
            std::lock_guard<std::mutex> lk(m);
            ++data;
        }
    };
```

### Conversões

Existe uma ordenação parcial de qualificadores cv pela ordem de restrições crescentes. O tipo pode ser considerado _mais_ ou _menos_ cv-qualificado do que:

*   _não-qualificado_ < const
*   _não-qualificado_ < volatile
*   _não-qualificado_ < const volatile
*   const < const volatile
*   volatile < const volatile

Referências e ponteiros para tipos cv-qualificados podem ser implicitamente convertidos para referências e ponteiros para tipos mais cv-qualificados, veja [conversões de qualificação](<#/doc/language/implicit_cast>) para detalhes.

Para converter uma referência ou um ponteiro para um tipo cv-qualificado em uma referência ou ponteiro para um tipo menos cv-qualificado, [`const_cast`](<#/doc/language/const_cast>) deve ser usado.

### Notas

O qualificador const usado na declaração de uma variável não-local, não-volatile, não-[template](<#/doc/language/variable_template>) (desde C++14) e não-[inline](<#/doc/language/inline>) (desde C++17) que não é declarada extern, confere a ela [ligação interna](<#/doc/language/storage_duration>). Isso é diferente do C, onde variáveis const com escopo de arquivo têm ligação externa.

A gramática da linguagem C++ trata mutable como um [storage-class-specifier](<#/doc/language/storage_duration>), em vez de um qualificador de tipo, mas isso não afeta a classe de armazenamento ou a ligação.

Alguns usos de volatile são descontinuados:

*   lvalue de tipo volatile como operando de operadores [incremento/decremento](<#/doc/language/operator_incdec>) embutidos;
*   lvalue de tipo volatile como operando esquerdo de [atribuição direta](<#/doc/language/operator_assignment>) embutida, a menos que a expressão de atribuição direta apareça em um [contexto não avaliado](<#/doc/language/expressions>) ou seja uma [expressão de valor descartado](<#/doc/language/expressions>);
*   tipo de objeto volatile como tipo de parâmetro de função ou tipo de retorno;
*   qualificador volatile em declaração de [structured binding](<#/doc/language/structured_binding>).

| (desde C++20)

### Palavras-chave

[`const`](<#/doc/keyword/const>), [`volatile`](<#/doc/keyword/volatile>), [`mutable`](<#/doc/keyword/mutable>)

### Exemplo

Execute este código
```cpp
    #include <cstdlib>
    
    int main()
    {
        int n1 = 0;          // objeto não-const
        const int n2 = 0;    // objeto const
        int const n3 = 0;    // objeto const (o mesmo que n2)
        volatile int n4 = 0; // objeto volatile
    
        const struct
        {
            int n1;
            mutable int n2;
        } x = {0, 0};        // objeto const com membro mutable
    
        n1 = 1;   // OK: objeto modificável
    //  n2 = 2;   // erro: objeto não-modificável
        n4 = 3;   // OK: tratado como um efeito colateral
    //  x.n1 = 4; // erro: membro de um objeto const é const
        x.n2 = 4; // OK: membro mutable de um objeto const não é const
    
        const int& r1 = n1; // referência a const ligada a objeto não-const
    //  r1 = 2; // erro: tentativa de modificar através de referência a const
        const_cast<int&>(r1) = 2; // OK: modifica o objeto não-const n1
    
        const int& r2 = n2; // referência a const ligada a objeto const
    //  r2 = 2; // erro: tentativa de modificar através de referência a const
    //  const_cast<int&>(r2) = 2; // comportamento indefinido: tentativa de modificar o objeto const n2
    
        {}(n3, n4, x, r2); // veja também: [[maybe_unused]]
    
        std::system("g++ -O3 -Wa,-adhln ./main.cpp"); // pode emitir asm em sistemas POSIX
    }
```

Saída possível:
```
    # código de máquina típico produzido em uma plataforma x86_64
    # (apenas o código que contribui para efeitos colaterais observáveis é emitido)
    main:
        movl    $0, -4(%rsp) # volatile int n4 = 0;
        movl    $3, -4(%rsp) # n4 = 3;
        xorl    %eax, %eax   # retorna 0 (implícito)
        ret
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 1428](<https://cplusplus.github.io/CWG/issues/1428.html>) | C++98 | a definição de 'objeto const' era baseada na declaração | baseada no tipo do objeto
[CWG 1528](<https://cplusplus.github.io/CWG/issues/1528.html>) | C++98 | não havia requisito sobre o número de ocorrências de cada qualificador cv na mesma sequência de qualificadores cv | no máximo uma vez para cada qualificador cv
[CWG 1799](<https://cplusplus.github.io/CWG/issues/1799.html>) | C++98 | mutable poderia ser aplicado a membros de dados não declarados const, mas os tipos dos membros ainda poderiam ser const-qualificados | não pode aplicar mutable a membros de dados de tipos const-qualificados

### Veja também

[Documentação C](<#/>) para o qualificador const
---
[Documentação C](<#/>) para o qualificador volatile
*   [Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso dado.
*   [Padrão]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão.