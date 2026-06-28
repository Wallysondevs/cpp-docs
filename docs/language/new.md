# expressão new

Cria e inicializa objetos com [duração de armazenamento](<#/doc/language/storage_duration>) dinâmica, ou seja, objetos cuja vida útil não é necessariamente limitada pelo escopo em que foram criados.

### Sintaxe

---
`::`(opcional) `new` `(` type ﻿`)` new-initializer ﻿(opcional) | (1) |
---|---|---
`::`(opcional) `new` type new-initializer ﻿(opcional) | (2) |
`::`(opcional) `new` `(` placement-args ﻿`)` `(` type ﻿`)` new-initializer ﻿(opcional) | (3) |
`::`(opcional) `new` `(` placement-args ﻿`)` type new-initializer ﻿(opcional) | (4) |

1,2) Tenta criar um objeto do tipo, denotado pelo [type-id](<#/doc/language/type-id>) type, que pode ser um tipo array, e pode incluir um [especificador de tipo placeholder](<#/doc/language/auto>)(desde C++11), ou incluir um nome de template de classe cujo argumento deve ser deduzido por [dedução de argumento de template de classe](<#/doc/language/ctad>)(desde C++17).

3,4) O mesmo que (1,2), mas fornece argumentos adicionais para a função de alocação, veja [placement new](<#/doc/language/new>).

### Explicação

- **type** — o type-id alvo
- **new-initializer** — uma lista de expressões entre parênteses ou uma [lista de inicializadores entre chaves](<#/doc/language/initialization>)(desde C++11)
- **placement-args** — argumentos de placement adicionais

A expressão new tenta alocar armazenamento e então tenta construir e inicializar um único objeto sem nome, ou um array de objetos sem nome no armazenamento alocado. A expressão new retorna um ponteiro prvalue para o objeto construído ou, se um array de objetos foi construído, um ponteiro para o elemento inicial do array.

A sintaxe (1) ou (3) é necessária se type incluir parênteses:
```cpp
    new int(*[10])();    // error: parsed as (new int) (*[10]) ()
    new (int (*[10])()); // okay: allocates an array of 10 pointers to functions
```

Além disso, type é analisado de forma gulosa (greedy): ele incluirá cada token que pode fazer parte de um declarador:
```cpp
    new int + 1; // okay: parsed as (new int) + 1, increments a pointer returned by new int
    new int * 1; // error: parsed as (new int*) (1)
```

O new-initializer não é opcional se

*   type é um [array de limite desconhecido](<#/doc/language/array>),

*   um [placeholder](<#/doc/language/auto>) é usado em type, ou seja, auto ou decltype(auto)(desde C++14), possivelmente combinado com uma [restrição de tipo](<#/doc/language/constraints>)(desde C++20),

| (desde C++11)
*   um template de classe é usado em type cujos argumentos precisam ser [deduzidos](<#/doc/language/ctad>).

| (desde C++17)
```cpp
    double* p = new double[]{1, 2, 3}; // creates an array of type double[3]
    auto p = new auto('c');            // creates a single object of type char. p is a char*
     
    auto q = new std::integral auto(1);         // OK: q is an int*
    auto q = new std::floating_point auto(true) // ERROR: type constraint not satisfied
     
    auto r = new std::pair(1, true); // OK: r is a std::pair<int, bool>*
    auto r = new std::vector;        // ERROR: element type can't be deduced
```

### Arrays dinâmicos

Se type é um tipo array, todas as dimensões, exceto a primeira, devem ser especificadas como uma [expressão constante integral](<#/doc/language/constant_expression>) positiva (até C++14) [expressão constante convertida](<#/doc/language/constant_expression>) do tipo [std::size_t](<#/doc/types/size_t>)(desde C++14), mas (somente ao usar as sintaxes não-parentesizadas (2) e (4)) a primeira dimensão pode ser uma expressão de tipo integral, tipo de enumeração, ou tipo de classe com uma única função de conversão não-explícita para tipo integral ou de enumeração (até C++14) qualquer expressão conversível para [std::size_t](<#/doc/types/size_t>)(desde C++14). Esta é a única maneira de criar diretamente um array com tamanho definido em tempo de execução; tais arrays são frequentemente referidos como _arrays dinâmicos_ :
```cpp
    int n = 42;
    double a[n][5]; // error
    auto p1 = new  double[n][5];  // OK
    auto p2 = new  double[5][n];  // error: only the first dimension may be non-constant
    auto p3 = new (double[n][5]); // error: syntax (1) cannot be used for dynamic arrays
```

O comportamento é indefinido se o valor na primeira dimensão (convertido para tipo integral ou de enumeração, se necessário) for negativo. | (até C++11)
Nos seguintes casos, o valor da expressão que especifica a primeira dimensão é inválido:

*   a expressão é de um tipo não-classe e seu valor antes da conversão para [std::size_t](<#/doc/types/size_t>) é negativo;
*   a expressão é de um tipo classe e seu valor após a função de conversão definida pelo usuário e antes da [segunda conversão padrão](<#/doc/language/implicit_cast>) é negativo;
*   o valor da expressão é maior do que algum limite definido pela implementação;
*   o valor é menor do que o número de elementos do array fornecidos na lista de inicializadores entre chaves (incluindo o '\0' terminador em um [literal de string](<#/doc/language/string_literal>)).

Se o valor na primeira dimensão for inválido por qualquer uma dessas razões,

*   se, após a conversão para [std::size_t](<#/doc/types/size_t>), a primeira dimensão for uma [expressão constante central](<#/doc/language/constant_expression>) e for [potencialmente avaliada](<#/doc/language/expressions>), o programa é malformado,
*   caso contrário, se a função de alocação que teria sido chamada não for lançadora (non-throwing) (incluindo sobrecargas [std::nothrow](<#/doc/memory/new/nothrow>) não declaradas noexcept), a expressão new retorna o ponteiro nulo do tipo de resultado exigido,
*   caso contrário, a expressão new não chama a função de alocação e, em vez disso, lança uma exceção de um tipo que corresponderia a um [handler](<#/doc/language/catch>) do tipo [std::bad_array_new_length](<#/doc/memory/new/bad_array_new_length>).

| (desde C++11)

A primeira dimensão zero é aceitável, e a função de alocação é chamada.

Se new-initializer é uma lista de inicializadores entre chaves, e a primeira dimensão é [potencialmente avaliada](<#/doc/language/expressions>) e não é uma [expressão constante central](<#/doc/language/constant_expression>), as restrições semânticas de [inicialização por cópia](<#/doc/language/copy_initialization>) de um elemento hipotético do array a partir de uma lista de inicializadores vazia são verificadas. | (desde C++11)

### Alocação

A expressão new aloca armazenamento chamando a [função de alocação](<#/doc/memory/new/operator_new>) apropriada. Se type é um tipo não-array, o nome da função é [operator new](<#/doc/memory/new/operator_new>). Se type é um tipo array, o nome da função é [operator new](<#/doc/memory/new/operator_new>) [].

Conforme descrito em [função de alocação](<#/doc/memory/new/operator_new>), o programa C++ pode fornecer substituições globais e específicas de classe para essas funções. Se a expressão new começar com o operador :: opcional, como em ::new T ou ::new T[n], as substituições específicas de classe serão ignoradas (a função é [procurada](<#/doc/language/lookup>) no [escopo](<#/doc/language/scope>) global). Caso contrário, se `T` for um tipo de classe, a procura começa no escopo da classe de `T`.

Ao chamar a função de alocação, a expressão new passa o número de bytes solicitados como o primeiro argumento, do tipo [std::size_t](<#/doc/types/size_t>), que é exatamente sizeof(T) para `T` não-array.

A alocação de array pode fornecer um overhead não especificado, que pode variar de uma chamada a new para a próxima, a menos que a função de alocação selecionada seja a forma padrão não-alocadora. O ponteiro retornado pela expressão new será deslocado por esse valor em relação ao ponteiro retornado pela função de alocação. Muitas implementações usam o overhead do array para armazenar o número de objetos no array, que é usado pela expressão [delete[]](<#/doc/language/delete>) para chamar o número correto de destrutores. Além disso, se a expressão new for usada para alocar um array de char, unsigned char, ou [`std::byte`](<#/doc/types/byte>)(desde C++17), ela pode solicitar memória adicional da função de alocação, se necessário, para garantir o alinhamento correto de objetos de todos os tipos não maiores que o tamanho do array solicitado, caso um seja posteriormente colocado no array alocado.

```cpp
Expressões new podem omitir (elide) ou combinar alocações feitas através de funções de alocação substituíveis. No caso de omissão, o armazenamento pode ser fornecido pelo compilador sem fazer a chamada a uma função de alocação (isso também permite otimizar expressões new não utilizadas). No caso de combinação, a alocação feita por uma expressão new E1 pode ser estendida para fornecer armazenamento adicional para outra expressão new E2 se tudo o que se segue for verdadeiro: 1) A vida útil do objeto alocado por E1 contém estritamente a vida útil do objeto alocado por E2. 2) E1 e E2 invocariam a mesma função de alocação global substituível. 3) Para uma função de alocação lançadora (throwing), as exceções em E1 e E2 seriam primeiramente capturadas no mesmo handler. Note que esta otimização é permitida apenas quando expressões new são usadas, e não quaisquer outros métodos para chamar uma função de alocação substituível: delete[] new int[10]; pode ser otimizado, mas operator delete(operator new(10)); não pode.  // (desde C++14)
Durante uma avaliação de uma expressão constante, uma chamada a uma função de alocação é sempre omitida. Apenas expressões new que de outra forma resultariam em uma chamada a uma função de alocação global substituível podem ser avaliadas em expressões constantes.  // (desde C++20)
```

#### Placement new

Se placement-args forem fornecidos, eles são passados para a função de alocação como argumentos adicionais. Tais funções de alocação são conhecidas como "placement new", em referência à função de alocação padrão void* [operator new](<#/doc/memory/new/operator_new>)([std::size_t](<#/doc/types/size_t>), void*), que simplesmente retorna seu segundo argumento inalterado. Isso é usado para construir objetos em armazenamento alocado:
```cpp
    // dentro de qualquer escopo de bloco...
    {
        // Aloca estaticamente o armazenamento com duração de armazenamento automática
        // que é grande o suficiente para qualquer objeto do tipo “T”.
        alignas(T) unsigned char buf[sizeof(T)];
     
        T* tptr = new(buf) T; // Constrói um objeto “T”, colocando-o diretamente em seu
                              // armazenamento pré-alocado no endereço de memória “buf”.
     
        tptr->~T();           // Você deve chamar **manualmente** o destrutor do objeto
                              // se seus efeitos colaterais forem dependentes do programa.
    }                         // Sair deste escopo de bloco desaloca automaticamente “buf”.
```

Nota: esta funcionalidade é encapsulada pelas funções membro das classes [Allocator](<#/doc/named_req/Allocator>).

Ao alocar um objeto cujo requisito de alinhamento excede [`__STDCPP_DEFAULT_NEW_ALIGNMENT__`](<#/doc/preprocessor/replace>) ou um array de tais objetos, a expressão new passa o requisito de alinhamento (envolvido em [std::align_val_t](<#/doc/memory/new/align_val_t>)) como o segundo argumento para a função de alocação (para formas de placement, os placement-arg aparecem após o alinhamento, como o terceiro, quarto, etc. argumentos). Se a resolução de sobrecarga falhar (o que acontece quando uma função de alocação específica de classe é definida com uma assinatura diferente, pois ela oculta as globais), a resolução de sobrecarga é tentada uma segunda vez, sem alinhamento na lista de argumentos. Isso permite que funções de alocação específicas de classe que não consideram alinhamento tenham precedência sobre as funções de alocação globais que consideram alinhamento. | (desde C++17)
```cpp
    new T;      // calls operator new(sizeof(T))
                // (C++17) or operator new(sizeof(T), std::align_val_t(alignof(T))))
    new T[5];   // calls operator new*5 + overhead)
                // (C++17) or operator new(sizeof(T)*5+overhead, std::align_val_t(alignof(T))))
    new(2,f) T; // calls operator new(sizeof(T), 2, f)
                // (C++17) or operator new(sizeof(T), std::align_val_t(alignof(T)), 2, f)
```

Se uma função de alocação não-lançadora (non-throwing) (por exemplo, a selecionada por new([std::nothrow](<#/doc/memory/new/nothrow>)) T) retornar um ponteiro nulo devido a uma falha de alocação, então a expressão new retorna imediatamente, ela não tenta inicializar um objeto ou chamar uma função de desalocação. Se um ponteiro nulo for passado como argumento para uma expressão placement new não-alocadora, o que faz com que a função de alocação placement padrão não-alocadora selecionada retorne um ponteiro nulo, o comportamento é indefinido.

### Inicialização

O objeto criado por uma expressão new é inicializado de acordo com as seguintes regras.

Se type não é um tipo array, o objeto único é construído na área de memória adquirida:

*   Se new-initializer estiver ausente, o objeto é [inicializado por padrão](<#/doc/language/default_initialization>).
*   Se new-initializer é uma lista de expressões entre parênteses, o objeto é [inicializado diretamente](<#/doc/language/direct_initialization>).

*   Se new-initializer é uma lista de inicializadores entre chaves, o objeto é [inicializado por lista](<#/doc/language/list_initialization>).

| (desde C++11)

Se type é um tipo array, um array de objetos é inicializado:

*   Se new-initializer estiver ausente, cada elemento é [inicializado por padrão](<#/doc/language/default_initialization>).

    *   Mesmo que a primeira dimensão seja zero, as restrições semânticas de inicialização por padrão de um elemento hipotético ainda precisam ser atendidas.

*   Se new-initializer é um par de parênteses, cada elemento é [inicializado por valor](<#/doc/language/value_initialization>).

    *   Mesmo que a primeira dimensão seja zero, as restrições semânticas de inicialização por valor de um elemento hipotético ainda precisam ser atendidas.

*   Se new-initializer é uma lista de inicializadores entre chaves, o array é [inicializado por agregação](<#/doc/language/aggregate_initialization>).

| (desde C++11)

*   Se new-initializer é uma lista de expressões não-vazia entre parênteses, o array é [inicializado por agregação](<#/doc/language/aggregate_initialization>).

| (desde C++20)

#### Falha na inicialização

Se a inicialização terminar lançando uma exceção (por exemplo, do construtor), o programa procura por uma função de desalocação correspondente, então:

*   Se uma função de desalocação adequada puder ser encontrada, a função de desalocação é chamada para liberar a memória na qual o objeto estava sendo construído. Depois disso, a exceção continua a se propagar no contexto da expressão new.
*   Se nenhuma função de desalocação correspondente e não ambígua puder ser encontrada, a propagação da exceção não causa a liberação da memória do objeto. Isso é apropriado apenas se a função de alocação chamada não alocar memória, caso contrário, é provável que resulte em um vazamento de memória.

O escopo da [procura](<#/doc/language/lookup>) da função de desalocação correspondente é determinado da seguinte forma:

*   Se a expressão new não começar com `::`, e o tipo alocado for um tipo de classe `T` ou um array de tipo de classe `T`, uma procura é realizada pelo nome da função de desalocação no escopo da classe de `T`.
*   Caso contrário, ou se nada for encontrado no escopo da classe de `T`, o nome da função de desalocação é procurado no [escopo global](<#/doc/language/scope>).

Para uma função de alocação não-placement, a procura normal da função de desalocação é usada para encontrar a função de desalocação correspondente (veja [expressão delete](<#/doc/language/delete>)).

Para uma função de alocação placement, a função de desalocação correspondente deve ter o mesmo número de parâmetros, e cada tipo de parâmetro, exceto o primeiro, é idêntico ao tipo de parâmetro correspondente da função de alocação (após [transformações de parâmetro](<#/doc/language/function>)).

*   Se a procura encontrar uma única função de desalocação correspondente, essa função será chamada; caso contrário, nenhuma função de desalocação será chamada.
*   Se a procura encontrar uma função de desalocação não-placement e essa função, considerada como uma função de desalocação placement, teria sido selecionada como uma correspondência para a função de alocação, o programa é malformado.

Em qualquer caso, a função de desalocação correspondente (se houver) deve ser não-deletada e (desde C++11) acessível do ponto onde a expressão new aparece.
```cpp
    struct S
    {
        // Função de alocação Placement:
        static void* operator new(std::size_t, std::size_t);
     
        // Função de desalocação não-placement:
        static void operator delete(void*, std::size_t);
    };
     
    S* p = new (0) S; // error: non-placement deallocation function matches
                      //        placement allocation function
```

Se uma função de desalocação for chamada em uma expressão new (devido a falha de inicialização), os argumentos passados para essa função são determinados da seguinte forma:

*   O primeiro argumento é o valor (do tipo void*) retornado da chamada da função de alocação.
*   Outros argumentos (apenas para funções de desalocação placement) são os placement-args passados para a função de alocação placement.

Se a implementação puder introduzir um objeto temporário ou fazer uma cópia de qualquer argumento como parte da chamada à função de alocação, é não especificado se o mesmo objeto é usado na chamada tanto para as funções de alocação quanto de desalocação.

### Vazamentos de memória

Os objetos criados por expressões new (objetos com duração de armazenamento dinâmica) persistem até que o ponteiro retornado pela expressão new seja usado em uma [expressão delete](<#/doc/language/delete>) correspondente. Se o valor original do ponteiro for perdido, o objeto torna-se inalcançável e não pode ser desalocado: ocorre um _vazamento de memória_.

Isso pode acontecer se o ponteiro for atribuído a:
```cpp
    int* p = new int(7); // int alocado dinamicamente com valor 7
    p = nullptr; // vazamento de memória
```

ou se o ponteiro sair do escopo:
```cpp
    void f()
    {
        int* p = new int(7);
    } // vazamento de memória
```

ou devido a uma exceção:
```cpp
    void f()
    {
        int* p = new int(7);
        g();      // pode lançar uma exceção
        delete p; // ok se nenhuma exceção
    } // vazamento de memória se g() lançar uma exceção
```

Para simplificar o gerenciamento de objetos alocados dinamicamente, o resultado de uma expressão new é frequentemente armazenado em um [smart pointer](<#/doc/memory>): [std::auto_ptr](<#/doc/memory/auto_ptr>) (até C++17)[std::unique_ptr](<#/doc/memory/unique_ptr>), ou [std::shared_ptr](<#/doc/memory/shared_ptr>)(desde C++11). Esses ponteiros garantem que a expressão delete seja executada nas situações mostradas acima.

### Notas

[Itanium C++ ABI](<https://itanium-cxx-abi.github.io/cxx-abi/abi.html#array-cookies>) exige que o overhead de alocação de array seja zero se o tipo do elemento do array criado for trivialmente destrutível. O mesmo ocorre com o MSVC.

Algumas implementações (por exemplo, MSVC antes do VS 2019 v16.7) exigem overhead de alocação de array não-zero em placement array new não-alocador se o tipo do elemento não for trivialmente destrutível, o que não está mais em conformidade desde o [problema CWG 2382](<https://cplusplus.github.io/CWG/issues/2382.html>).

Uma expressão placement array new não-alocadora que cria um array de unsigned char, ou [`std::byte`](<#/doc/types/byte>)(desde C++17) pode ser usada para [criar objetos implicitamente](<#/doc/language/lifetime>) em uma determinada região de armazenamento: ela encerra a vida útil de objetos que se sobrepõem ao array, e então implicitamente cria objetos de tipos de vida útil implícita no array.

[std::vector](<#/doc/container/vector>) oferece funcionalidade semelhante para arrays dinâmicos unidimensionais.

### Palavras-chave

[`new`](<#/doc/keyword/new>)

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 74](<https://cplusplus.github.io/CWG/issues/74.html>) | C++98 | o valor na primeira dimensão deve ter tipo integral | tipos de enumeração permitidos
[CWG 299](<https://cplusplus.github.io/CWG/issues/299.html>) | C++98 | o valor na primeira dimensão deve ter tipo integral ou de enumeração | tipos de classe com uma única função de conversão para tipo integral ou de enumeração permitidos
[CWG 624](<https://cplusplus.github.io/CWG/issues/624.html>) | C++98 | o comportamento era não especificado quando o tamanho do objeto alocado excederia o limite definido pela implementação | nenhum armazenamento é obtido e uma exceção é lançada neste caso
[CWG 1748](<https://cplusplus.github.io/CWG/issues/1748.html>) | C++98 | placement new não-alocador precisa verificar se o argumento é nulo | comportamento indefinido para argumento nulo
[CWG 1992](<https://cplusplus.github.io/CWG/issues/1992.html>) | C++11 | new ([std::nothrow](<#/doc/memory/new/nothrow>)) int[N] poderia lançar [std::bad_array_new_length](<#/doc/memory/new/bad_array_new_length>) | alterado para retornar um ponteiro nulo
[CWG 2102](<https://cplusplus.github.io/CWG/issues/2102.html>) | C++98 | não estava claro se a inicialização por padrão/valor é exigida para ser bem-formada ao inicializar arrays vazios | exigido
[CWG 2382](<https://cplusplus.github.io/CWG/issues/2382.html>) | C++98 | placement array new não-alocador poderia exigir overhead de alocação | tal overhead de alocação não permitido
[CWG 2392](<https://cplusplus.github.io/CWG/issues/2392.html>) | C++11 | o programa poderia ser malformado mesmo que a primeira dimensão não fosse potencialmente avaliada | bem-formado neste caso
[P1009R2](<https://wg21.link/P1009R2>) | C++11 | o limite do array não podia ser deduzido em uma expressão new | dedução permitida

### Veja também

*   [construtor](<#/doc/language/initializer_list>)
*   [elision de cópia](<#/doc/language/copy_elision>)
*   [construtor padrão](<#/doc/language/default_constructor>)
*   [`delete`](<#/doc/language/delete>)
*   [destrutor](<#/doc/language/destructor>)
*   [inicialização](<#/doc/language/initialization>)
    *   [inicialização por agregação](<#/doc/language/aggregate_initialization>)
    *   [inicialização por padrão](<#/doc/language/default_initialization>)
    *   [inicialização direta](<#/doc/language/direct_initialization>)
    *   [inicialização por lista](<#/doc/language/list_initialization>)
    *   [inicialização por valor](<#/doc/language/value_initialization>)
