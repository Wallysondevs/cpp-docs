# Inicialização padrão

Esta é a inicialização realizada quando um objeto é construído sem um inicializador.

### Sintaxe

T object `;` | (1) |
---|---|---
`new` T | (2) |

### Explicação

A inicialização padrão é realizada em três situações:

1) quando uma variável com [duração de armazenamento](<#/doc/language/storage_duration>) automática, estática ou de thread-local é declarada sem um inicializador;

2) quando um objeto com duração de armazenamento dinâmica é criado por uma [new-expression](<#/doc/language/new>) sem um inicializador;

3) quando uma classe base ou um membro de dados não estático não é mencionado em uma [lista de inicializadores de construtor](<#/doc/language/initializer_list>) e esse construtor é chamado.

Os efeitos da inicialização padrão são:

*   se `T` é um tipo de classe não-POD (possivelmente cv-qualificado)(ate C++11), os construtores são considerados e submetidos à [resolução de sobrecarga](<#/doc/language/overload_resolution>) contra a lista de argumentos vazia. O construtor selecionado (que é um dos [construtores padrão](<#/doc/language/default_constructor>)) é chamado para fornecer o valor inicial para o novo objeto;
*   se `T` é um tipo array, cada elemento do array é inicializado por padrão;
*   caso contrário, nenhuma inicialização é realizada (veja [notas](<#/doc/language/default_initialization>)).

Apenas tipos de classe não-POD (possivelmente cv-qualificados) (ou arrays deles) com duração de armazenamento automática eram considerados inicializados por padrão quando nenhum inicializador era usado. Escaladores e tipos POD com duração de armazenamento dinâmica eram considerados não inicializados (desde C++11, esta situação foi reclassificada como uma forma de inicialização padrão). | (ate C++11)

---

### Inicialização padrão de um objeto const

Se um programa solicita a inicialização padrão de um objeto de um tipo `T` [const](<#/doc/language/cv>)-qualificado, `T` deve ser um tipo de classe _const-default-constructible_ ou um array dele.

Um tipo de classe `T` é const-default-constructible se a inicialização padrão de `T` invocaria um construtor fornecido pelo usuário de `T` (não herdado de uma classe base)(desde C++11) ou se

*   cada membro de dados não estático direto `M` de `T` é do tipo de classe `X` (ou array dele), `X` é const-default-constructible, e
*   `T` não possui [membros variantes](<#/doc/language/union>) diretos, e

| (ate C++11)

---

*   cada membro de dados não estático não variante direto `M` de `T` possui um [inicializador de membro padrão](<#/doc/language/data_members>) ou, se `M` é do tipo de classe `X` (ou array dele), `X` é const-default-constructible,
*   se `T` é uma union com pelo menos um membro de dados não estático, exatamente um [membro variante](<#/doc/language/union>) possui um inicializador de membro padrão,
*   se `T` não é uma union, para cada membro de union anônima com pelo menos um membro de dados não estático (se houver), exatamente um membro de dados não estático possui um inicializador de membro padrão, e

| (desde C++11)

cada classe base [potencialmente construída](<#/doc/language/objects>) de `T` é const-default-constructible.

### Valores indeterminados e errôneos

Quando o armazenamento para um objeto com duração de armazenamento automática ou dinâmica é obtido, o objeto possui um _valor indeterminado_. Se nenhuma inicialização é realizada para um objeto, esse objeto retém um valor indeterminado até que esse valor seja substituído. | (ate C++26)

---

Quando o armazenamento para um objeto com duração de armazenamento automática ou dinâmica é obtido, os bytes que compõem o armazenamento para o objeto possuem o seguinte valor inicial:

*   Se o objeto possui duração de armazenamento dinâmica, ou é o objeto associado a uma variável ou [parâmetro de função](<#/doc/language/function>) cuja primeira declaração é marcada com `[[[indeterminate](<#/doc/language/attributes/indeterminate>)]]`, os bytes possuem _valores indeterminados_.
*   Caso contrário, os bytes possuem _valores errôneos_, onde cada valor é determinado pela implementação independentemente do estado do programa.

Se nenhuma inicialização é realizada para um objeto (incluindo [subobjetos](<#/doc/language/objects>)), tal byte retém seu valor inicial até que esse valor seja substituído.

*   Se qualquer bit na [representação de valor](<#/doc/language/objects>) possui um valor indeterminado, o objeto possui um _valor indeterminado_.
*   Caso contrário, se qualquer bit na representação de valor possui um valor errôneo, o objeto possui um _valor errôneo_.

| (desde C++26)

Se uma avaliação produz um valor indeterminado, o comportamento é [indefinido](<#/doc/language/ub>).

Se uma avaliação produz um valor errôneo, o comportamento é [errôneo](<#/doc/language/ub>). | (desde C++26)

---

#### Casos especiais

Os seguintes tipos são _uninitialized-friendly_:

*   [`std::byte`](<#/doc/types/byte>)

| (desde C++17)

---

*   unsigned char
*   char, se seu tipo subjacente é unsigned char

Dado um valor indeterminado ou errôneo (desde C++26), o _valor de resultado não inicializado_ do valor é:

*   Um valor indeterminado, se o valor também é um valor indeterminado.

*   o valor, se o valor é um valor errôneo.

| (desde C++26)

---

Se uma avaliação `eval` produz um valor indeterminado ou errôneo (desde C++26) de um tipo _uninitialized-friendly_, o comportamento é bem definido nos seguintes casos:

*   `eval` é a avaliação de uma das seguintes expressões e operandos:

*   O segundo ou terceiro operando de uma [expressão condicional](<#/doc/language/operator_other>).
*   O operando direito de uma [expressão de vírgula](<#/doc/language/operator_other>).
*   O operando de uma [conversão integral](<#/doc/language/implicit_cast>), [conversão explícita](<#/doc/language/explicit_cast>) ou [`static_cast`](<#/doc/language/static_cast>) para um tipo _uninitialized-friendly_.
*   Uma [expressão de valor descartado](<#/doc/language/expressions>).

Neste caso, o resultado da operação é o valor de resultado não inicializado do valor.

*   `eval` é uma avaliação do operando direito de um [operador de atribuição simples](<#/doc/language/operator_assignment>) cujo operando esquerdo é um lvalue de um tipo _uninitialized-friendly_.

Neste caso, o valor do objeto referenciado pelo operando esquerdo é substituído pelo valor de resultado não inicializado do valor.

*   `eval` é a avaliação da expressão de inicialização ao inicializar um objeto de um tipo _uninitialized-friendly_.

*   o valor não pode ser do tipo [`std::byte`](<#/doc/types/byte>) se o objeto sendo inicializado não é do tipo [`std::byte`](<#/doc/types/byte>).

| (desde C++17)

---

Neste caso, esse objeto é inicializado com o valor de resultado não inicializado do valor.

Converter um valor indeterminado de um tipo _uninitialized-friendly_ produz um valor indeterminado.

Converter um valor errôneo de um tipo _uninitialized-friendly_ produz um valor errôneo, o resultado da conversão é o valor do operando convertido. | (desde C++26)

---
```cpp
    // Caso 1: Objetos não inicializados com duração de armazenamento dinâmica
    // Todas as versões C++: valor indeterminado + comportamento indefinido
    int f(bool b)
    {
        unsigned char* c = new unsigned char;
        unsigned char d = *c; // OK, “d” tem um valor indeterminado
        int e = d;            // comportamento indefinido
        return b ? d : 0;     // comportamento indefinido se “b” é verdadeiro
    }
    
    // Caso 2: Objetos não inicializados com duração de armazenamento automática
    // ate C++26: valor indeterminado + comportamento indefinido
    // desde C++26: valor errôneo + comportamento errôneo
    int g(bool b)
    {
        unsigned char c;     // “c” tem um valor indeterminado/errôneo
    
        unsigned char d = c; // sem comportamento indefinido/errôneo,
                             // mas “d” tem um valor indeterminado/errôneo
    
        assert(c == d);      // válido, mas ambas as promoções integrais têm
                             // comportamento indefinido/errôneo
    
        int e = d;           // comportamento indefinido/errôneo
        return b ? d : 0;    // comportamento indefinido/errôneo se “b” é verdadeiro
    }
    
    // O mesmo que o caso 2
    void h()
    {
        int d1, d2;  // “d1” e “d2” têm valores indeterminados/errôneos
        int e1 = d1; // comportamento indefinido/errôneo
        int e2 = d1; // comportamento indefinido/errôneo
    
        assert(e1 == e2); // válido
        assert(e1 == d1); // válido, comportamento indefinido/errôneo
        assert(e2 == d1); // válido, comportamento indefinido/errôneo
    
        // sem comportamento indefinido/errôneo,
        // mas “d2” tem um valor indeterminado/errôneo
        std::memcpy(&d2, &d1, sizeof(int));
    
        assert(e1 == d2); // válido, comportamento indefinido/errôneo
        assert(e2 == d2); // válido, comportamento indefinido/errôneo
    }
```

### Notas

Referências e objetos escalares const não podem ser inicializados por padrão.

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_constexpr`](<#/doc/feature_test>) | [`201907L`](<#/>) | (C++20) | Inicialização padrão trivial e [declaração asm](<#/doc/language/asm>) em funções constexpr

### Exemplo

Execute este código
```cpp
    #include <string>
    
    struct T1 { int mem; };
    
    struct T2
    {
        int mem;
        T2() {} // “mem” não está na lista de inicializadores
    };
    
    int n; // não-classe estática, uma inicialização em duas fases é feita:
           // 1) zero-initialization inicializa n para zero
           // 2) default-initialization não faz nada, deixando n como zero
    
    int main()
    {
        [[maybe_unused]]
        int n;            // não-classe, o valor é indeterminado
        std::string s;    // classe, chama o construtor padrão, o valor é ""
        std::string a[2]; // array, inicializa os elementos por padrão, o valor é {"", ""}
    //  int& r;           // Erro: uma referência
    //  const int n;      // Erro: uma não-classe const
    //  const T1 t1;      // Erro: classe const com construtor padrão implícito
        [[maybe_unused]]
        T1 t1;            // classe, chama o construtor padrão implícito
        const T2 t2;      // classe const, chama o construtor padrão fornecido pelo usuário
                          // t2.mem é inicializado por padrão
    }
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[CWG 178](<https://cplusplus.github.io/CWG/issues/178.html>) | C++98 | não havia value-initialization;
inicializador vazio invocava default-initialization
(embora new T() também realize zero-initialization) | inicializador vazio invoca
value-initialization
[CWG 253](<https://cplusplus.github.io/CWG/issues/253.html>) | C++98 | a inicialização padrão de um objeto const não podia
---|---|---
chamar um construtor padrão implicitamente declarado | permitido se todos os subobjetos são inicializados
[CWG 616](<https://cplusplus.github.io/CWG/issues/616.html>) | C++98 | a conversão de lvalue para rvalue de qualquer
objeto não inicializado era sempre UB | unsigned char indeterminado é permitido
[CWG 1787](<https://cplusplus.github.io/CWG/issues/1787.html>) | C++98 | a leitura de um unsigned char indeterminado
armazenado em cache em um registrador era UB | tornada bem definida

### Veja também

*   [construtor de conversão](<#/doc/language/converting_constructor>)
*   [construtor padrão](<#/doc/language/default_constructor>)
*   [`explicit`](<#/doc/language/explicit>)
*   [inicialização](<#/doc/language/initialization>)
    *   [inicialização de agregado](<#/doc/language/aggregate_initialization>)
    *   [inicialização constante](<#/doc/language/constant_initialization>)
    *   [inicialização por cópia](<#/doc/language/copy_initialization>)
    *   [inicialização direta](<#/doc/language/direct_initialization>)
    *   [inicialização por lista](<#/doc/language/list_initialization>)
    *   [inicialização de referência](<#/doc/language/reference_initialization>)
    *   [value-initialization](<#/doc/language/value_initialization>)
    *   [zero-initialization](<#/doc/language/zero_initialization>)
*   [`new`](<#/doc/language/new>)
