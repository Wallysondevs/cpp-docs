# Objeto
Programas C++ criam, destroem, referenciam, acessam e manipulam _objetos_.

Um objeto, em C++, possui

*   tamanho (pode ser determinado com [`sizeof`](<#/doc/language/sizeof>));
*   requisito de alinhamento (pode ser determinado com [`alignof`](<#/doc/language/alignof>));
*   [duração de armazenamento](<#/doc/language/storage_duration>) (automática, estática, dinâmica, thread-local);
*   [tempo de vida](<#/doc/language/lifetime>) (delimitado pela duração de armazenamento ou temporário);
*   [tipo](<#/doc/language/type-id>);
*   valor (que pode ser indeterminado, por exemplo, para tipos não-classe [inicializados por padrão](<#/doc/language/default_initialization>));
*   opcionalmente, um [nome](<#/doc/language/name>).

As seguintes entidades não são objetos: valor, referência, função, enumerador, tipo, membro não-estático de classe, template, especialização de template de classe ou função, namespace, parameter pack, e this.

Uma _variável_ é um objeto ou uma referência que não é um membro de dados não-estático, que é introduzida por uma [declaração](<#/doc/language/declarations>).

### Criação de objetos
Objetos podem ser criados explicitamente por [definições](<#/doc/language/definition>), [expressões new](<#/doc/language/new>), [expressões throw](<#/doc/language/throw>), alterando o membro ativo de uma [union](<#/doc/language/union>) e avaliando expressões que requerem [objetos temporários](<#/doc/language/lifetime>). O objeto criado é definido de forma única na criação explícita de objetos.

Objetos de [tipos de tempo de vida implícito](<#/doc/language/type-id>) também podem ser criados implicitamente por

*   exceto durante a avaliação de constante, operações que iniciam o tempo de vida de um array do tipo unsigned char ou [`std::byte`](<#/doc/types/byte>)(desde C++17), caso em que tais objetos são criados no array,
*   chamada para as seguintes funções de alocação, caso em que tais objetos são criados no armazenamento alocado:

    *   [operator new](<#/doc/memory/new/operator_new>) (exceto durante a avaliação de constante)
    *   [operator new[]](<#/doc/memory/new/operator_new>) (exceto durante a avaliação de constante)
    *   [std::malloc](<#/doc/memory/c/malloc>)
    *   [std::calloc](<#/doc/memory/c/calloc>)
    *   [std::realloc](<#/doc/memory/c/realloc>)
    *   [std::aligned_alloc](<#/doc/memory/c/aligned_alloc>) (desde C++17)
*   chamada para as seguintes funções de cópia de [representação de objeto](<#/doc/language/objects>), caso em que tais objetos são criados na região de destino do armazenamento ou no resultado:

    *   [std::memcpy](<#/doc/string/byte/memcpy>)
    *   [std::memmove](<#/doc/string/byte/memmove>)
    *   [`std::bit_cast`](<#/doc/numeric/bit_cast>) (desde C++20)
*   chamada para as seguintes funções específicas, caso em que tais objetos são criados na região de armazenamento especificada:

    *   std::start_lifetime_as
    *   std::start_lifetime_as_array (desde C++23)

Zero ou mais objetos podem ser criados na mesma região de armazenamento, desde que isso resulte em comportamento definido para o programa. Se tal criação for impossível, por exemplo, devido a operações conflitantes, o comportamento do programa é indefinido. Se múltiplos conjuntos de objetos criados implicitamente resultassem em comportamento definido para o programa, é não especificado qual desses conjuntos de objetos é criado. Em outras palavras, objetos criados implicitamente não são obrigados a ser definidos de forma única.

Após a criação implícita de objetos dentro de uma região de armazenamento especificada, algumas operações produzem um ponteiro para um _objeto criado adequado_. O objeto criado adequado tem o mesmo endereço que a região de armazenamento. Da mesma forma, o comportamento é indefinido se e somente se nenhum valor de ponteiro puder dar ao programa um comportamento definido, e é não especificado qual valor de ponteiro é produzido se houver múltiplos valores que dão ao programa um comportamento definido.
```cpp
    #include <cstdlib>
     
    struct X { int a, b; };
     
    X* MakeX()
    {
        // One of possible defined behaviors:
        // the call to std::malloc implicitly creates an object of type X
        // and its subobjects a and b, and returns a pointer to that X object
        X* p = static_cast<X*>(std::malloc(sizeof(X)));
        p->a = 1;
        p->b = 2;
        return p;
    }
```

A chamada para [std::allocator::allocate](<#/doc/memory/allocator/allocate>) ou funções membro especiais de cópia/movimentação definidas implicitamente de tipos [union](<#/doc/language/union>) também podem criar objetos.

### Representação de objeto e representação de valor
Alguns tipos e objetos possuem _representações de objeto_ e _representações de valor_, elas são definidas na tabela abaixo:

Entidade | Representação de objeto | Representação de valor
---|---|---
um tipo de objeto completo `T` | a sequência de N objetos unsigned char ocupados por um objeto completo não-[bit-field](<#/doc/language/bit_field>) do tipo `T`, onde N é sizeof(T) | o conjunto de bits na representação de objeto de `T` que participam na representação de um valor do tipo `T`
um objeto completo não-bit-field obj do tipo `T` | os bytes de obj correspondentes à representação de objeto de `T` | os bits de obj correspondentes à representação de valor de `T`
um objeto bit-field bf | a sequência de N bits ocupados por bf, onde N é a largura do bit-field | o conjunto de bits na representação de objeto de bf que participam na representação do valor de bf

Bits na representação de objeto de um tipo ou objeto que não fazem parte da representação de valor são _bits de preenchimento_ (padding bits).

Para tipos [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>), a representação de valor é uma parte da representação de objeto, o que significa que copiar os bytes ocupados pelo objeto no armazenamento é suficiente para produzir outro objeto com o mesmo valor (exceto se o objeto for um subobjeto potencialmente sobreposto, ou o valor for uma _representação de armadilha_ de seu tipo e carregá-lo na CPU levantar uma exceção de hardware, como valores de ponto flutuante SNaN ("signalling not-a-number") ou inteiros NaT ("not-a-thing")).

Embora a maioria das implementações não permita representações de armadilha, bits de preenchimento ou múltiplas representações para tipos inteiros, existem exceções; por exemplo, um valor de um tipo inteiro em Itanium [pode ser uma representação de armadilha](<https://web.archive.org/web/20170830125905/https://blogs.msdn.microsoft.com/oldnewthing/20040119-00/?p=41003>).

O inverso não é necessariamente verdadeiro: dois objetos de um tipo [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>) com diferentes representações de objeto podem representar o mesmo valor. Por exemplo, múltiplos padrões de bits de ponto flutuante representam o mesmo valor especial [NaN](<#/doc/numeric/math/NAN>). Mais comumente, bits de preenchimento podem ser introduzidos para satisfazer [requisitos de alinhamento](<#/doc/language/objects>), tamanhos de [bit-field](<#/doc/language/bit_field>), etc.
```cpp
    #include <cassert>
     
    struct S
    {
        char c;  // 1 byte value
                 // 3 bytes of padding bits (assuming alignof(float) == 4)
        float f; // 4 bytes value (assuming sizeof(float) == 4)
     
        bool operator==(const S& arg) const // value-based equality
        {
            return c == arg.c && f == arg.f;
        }
    };
     
    void f()
    {
        assert(sizeof(S) == 8);
        S s1 = {'a', 3.14};
        S s2 = s1;
        reinterpret_cast<unsigned char*>(&s1)[2] = 'b'; // modify some padding bits
        assert(s1 == s2); // value did not change
    }
```

Para os objetos do tipo char, signed char e unsigned char (a menos que sejam [bit-fields](<#/doc/language/bit_field>) de tamanho excessivo), cada bit da representação de objeto é exigido para participar da representação de valor e cada padrão de bits possível representa um valor distinto (nenhum bit de preenchimento, bit de armadilha ou múltiplas representações permitidas).

### Subobjetos
Um objeto pode ter _subobjetos_. Estes incluem

*   objetos membro
*   subobjetos de classe base
*   elementos de array

Um objeto que não é um subobjeto de outro objeto é chamado de _objeto completo_.

Objetos completos, objetos membro e elementos de array também são conhecidos como _objetos mais derivados_, para distingui-los dos subobjetos de classe base.

Para uma classe,

*   seus [membros de dados](<#/doc/language/data_members>) não-estáticos,
*   suas [classes base](<#/doc/language/derived_class>) diretas não-virtuais, e,
*   se a classe não for [abstrata](<#/doc/language/abstract_class>), suas [classes base virtuais](<#/doc/language/derived_class>)

são chamados de seus _subobjetos potencialmente construídos_.

### Tamanho
Um subobjeto é um _subobjeto potencialmente sobreposto_ se for um subobjeto de classe base ou um membro de dados não-estático declarado com o atributo `[[[no_unique_address](<#/doc/language/attributes/no_unique_address>)]]`(desde C++20).

Um objeto obj só pode ter tamanho zero se todas as seguintes condições forem satisfeitas:

*   obj é um subobjeto potencialmente sobreposto.
*   obj é de um tipo de classe sem funções membro virtuais e classes base virtuais.
*   obj não possui nenhum subobjeto de tamanho não-zero ou [bit-fields](<#/doc/language/bit_field>) sem nome de comprimento não-zero.

Para um objeto obj que satisfaz todas as condições acima:

*   Se obj for um subobjeto de classe base de um tipo de classe [standard-layout](<#/doc/language/data_members>)(desde C++11) sem membros de dados não-estáticos, ele tem tamanho zero.
*   Caso contrário, é definido pela implementação sob quais circunstâncias obj tem tamanho zero.

Veja [otimização de classe base vazia](<#/doc/language/ebo>) para mais detalhes.

Qualquer objeto não-bit-field com tamanho não-zero deve ocupar um ou mais bytes de armazenamento, incluindo cada byte que é ocupado (total ou parcialmente) por qualquer um de seus subobjetos. O armazenamento ocupado deve ser contíguo se o objeto for de um tipo trivially copyable ou standard-layout(desde C++11).

### Endereço
A menos que um objeto seja um bit-field ou um subobjeto de tamanho zero, o _endereço_ desse objeto é o endereço do primeiro [byte](<#/doc/language/memory_model>) que ele ocupa.

Um objeto pode conter outros objetos, caso em que os objetos contidos estão _aninhados dentro_ do objeto anterior. Um objeto a está aninhado dentro de outro objeto b se qualquer uma das seguintes condições for satisfeita:

*   a é um subobjeto de b.
*   b [fornece armazenamento](<#/doc/language/lifetime>) para a.
*   Existe um objeto c onde a está aninhado dentro de c, e c está aninhado dentro de b.

Um objeto é um _objeto potencialmente não-único_ se for um dos seguintes objetos:

*   Um objeto [string literal](<#/doc/language/string_literal>).
*   O [array de apoio](<#/doc/language/list_initialization>) de uma initializer list. (desde C++11)
*   Um subobjeto de um objeto potencialmente não-único.

Para quaisquer dois objetos não-bit-field com [tempos de vida](<#/doc/language/lifetime>) sobrepostos:

*   Se qualquer uma das seguintes condições for satisfeita, eles podem ter o mesmo endereço:
    *   Um deles está aninhado dentro do outro.
    *   Qualquer um deles é um subobjeto de tamanho zero, e seus tipos não são [similares](<#/doc/language/implicit_cast>).
    *   Ambos são objetos potencialmente não-únicos.
*   Caso contrário, eles sempre têm endereços distintos e ocupam bytes de armazenamento disjuntos.

```cpp
    // character literals are always unique
    static const char test1 = 'x';
    static const char test2 = 'x';
    const bool b = &test1 != &test2;      // always true
     
    // the character 'x' accessed from “r”, “s” and “il”
    // may have the same address (i.e., these objects may share storage)
    static const char (&r) [] = "x";
    static const char *s = "x";
    static std::initializer_list<char> il = {'x'};
    const bool b2 = r != il.begin();      // unspecified result
    const bool b3 = r != s;               // unspecified result
    const bool b4 = il.begin() != &test1; // always true
    const bool b5 = r != &test1;          // always true
```

### Objetos polimórficos
Objetos de um tipo de classe que declara ou herda pelo menos uma função virtual são objetos polimórficos. Dentro de cada objeto polimórfico, a implementação armazena informações adicionais (em toda implementação existente, é um ponteiro, a menos que otimizado), que são usadas por chamadas de [função virtual](<#/doc/language/virtual>) e pelos recursos RTTI ([`dynamic_cast`](<#/doc/language/dynamic_cast>) e [`typeid`](<#/doc/language/typeid>)) para determinar, em tempo de execução, o tipo com o qual o objeto foi criado, independentemente da expressão em que é usado.

Para objetos não-polimórficos, a interpretação do valor é determinada pela expressão em que o objeto é usado e é decidida em tempo de compilação.

Execute este código
```cpp
    #include <iostream>
    #include <typeinfo>
     
    struct Base1
    {
        // polymorphic type: declares a virtual member
        virtual ~Base1() {}
    };
     
    struct Derived1 : Base1
    {
         // polymorphic type: inherits a virtual member
    };
     
    struct Base2
    {
         // non-polymorphic type
    };
     
    struct Derived2 : Base2
    {
         // non-polymorphic type
    };
     
    int main()
    {
        Derived1 obj1; // object1 created with type Derived1
        Derived2 obj2; // object2 created with type Derived2
     
        Base1& b1 = obj1; // b1 refers to the object obj1
        Base2& b2 = obj2; // b2 refers to the object obj2
     
        std::cout << "Expression type of b1: " << typeid(decltype(b1)).name() << '\n'
                  << "Expression type of b2: " << typeid(decltype(b2)).name() << '\n'
                  << "Object type of b1: " << typeid(b1).name() << '\n'
                  << "Object type of b2: " << typeid(b2).name() << '\n'
                  << "Size of b1: " << sizeof b1 << '\n'
                  << "Size of b2: " << sizeof b2 << '\n';
    }
```

Saída possível:
```
    Expression type of b1: Base1
    Expression type of b2: Base2
    Object type of b1: Derived1
    Object type of b2: Base2
    Size of b1: 8
    Size of b2: 1
```

### Aliasing estrito
Acessar um objeto usando uma expressão de um tipo diferente do tipo com o qual ele foi criado é comportamento indefinido em muitos casos, veja [`reinterpret_cast`](<#/doc/language/reinterpret_cast>) para a lista de exceções e exemplos.

### Alinhamento
Todo [tipo de objeto](<#/doc/language/type-id>) possui a propriedade chamada _requisito de alinhamento_, que é um valor inteiro não-negativo (do tipo [std::size_t](<#/doc/types/size_t>), e sempre uma potência de dois) representando o número de bytes entre endereços sucessivos nos quais objetos deste tipo podem ser alocados.

O requisito de alinhamento de um tipo pode ser consultado com [`alignof`](<#/doc/language/alignof>) ou [std::alignment_of](<#/doc/types/alignment_of>). A função de alinhamento de ponteiro [std::align](<#/doc/memory/align>) pode ser usada para obter um ponteiro adequadamente alinhado dentro de algum buffer, e [std::aligned_storage](<#/doc/types/aligned_storage>) pode ser usada para obter armazenamento adequadamente alinhado. (desde C++11)

Cada tipo de objeto impõe seu requisito de alinhamento a cada objeto desse tipo; um alinhamento mais rigoroso (com um requisito de alinhamento maior) pode ser solicitado usando [`alignas`](<#/doc/language/alignas>)(desde C++11). Tentar criar um objeto em armazenamento que não atenda aos requisitos de alinhamento do tipo do objeto é comportamento indefinido.

Para satisfazer os requisitos de alinhamento de todos os membros não-estáticos de uma [classe](<#/doc/language/class>), [bits de preenchimento](<#/doc/language/objects>) podem ser inseridos após alguns de seus membros.

Execute este código
```cpp
    #include <iostream>
     
    // objects of type S can be allocated at any address
    // because both S.a and S.b can be allocated at any address
    struct S
    {
        char a; // size: 1, alignment: 1
        char b; // size: 1, alignment: 1
    }; // size: 2, alignment: 1
     
    // objects of type X must be allocated at 4-byte boundaries
    // because X.n must be allocated at 4-byte boundaries
    // because int's alignment requirement is (usually) 4
    struct X
    {
        int n;  // size: 4, alignment: 4
        char c; // size: 1, alignment: 1
        // three bytes of padding bits
    }; // size: 8, alignment: 4 
     
    int main()
    {
        std::cout << "alignof(S) = " << alignof(S) << '\n'
                  << "sizeof(S)  = " << sizeof(S) << '\n'
                  << "alignof(X) = " << alignof(X) << '\n'
                  << "sizeof(X)  = " << sizeof(X) << '\n';
    }
```

Saída possível:
```
    alignof(S) = 1
    sizeof(S)  = 2
    alignof(X) = 4
    sizeof(X)  = 8
```

O alinhamento mais fraco (o menor requisito de alinhamento) é o alinhamento de char, signed char e unsigned char, que é igual a 1; o maior _alinhamento fundamental_ de qualquer tipo é definido pela implementação e igual ao alinhamento de [std::max_align_t](<#/doc/types/max_align_t>)(desde C++11).

Alinhamentos fundamentais são suportados para objetos de todos os tipos de durações de armazenamento.

Se o alinhamento de um tipo for tornado mais rigoroso (maior) do que [std::max_align_t](<#/doc/types/max_align_t>) usando [`alignas`](<#/doc/language/alignas>), ele é conhecido como um tipo com requisito de _alinhamento estendido_. Um tipo cujo alinhamento é estendido ou um tipo de classe cujo membro de dados não-estático tem alinhamento estendido é um _tipo super-alinhado_. Tipos [Allocator](<#/doc/named_req/Allocator>) são obrigados a lidar corretamente com tipos super-alinhados. (desde C++11)

É definido pela implementação se [expressões new](<#/doc/language/new>) e(ate C++17) [std::get_temporary_buffer](<#/doc/memory/get_temporary_buffer>) suportam tipos super-alinhados. (desde C++11)(ate C++20)

### Notas
Objetos em C++ têm um significado diferente dos objetos em [programação orientada a objetos (POO)](<https://en.wikipedia.org/wiki/Object-oriented_programming> "enwiki:Object-oriented programming"):

Objetos em C++ | Objetos em POO
---|---
podem ter qualquer tipo de objeto (veja [std::is_object](<#/doc/types/is_object>)) | devem ter um tipo de classe
não há conceito de “instância” | têm o conceito de “instância” (e existem mecanismos como `instanceof` para detectar a relação “instância de”)
não há conceito de “interface” | têm o conceito de “interface” (e existem mecanismos como `instanceof` para detectar se uma interface é implementada)
o polimorfismo precisa ser explicitamente habilitado via membros virtuais | o polimorfismo está sempre habilitado

No relatório de defeito [P0593R6](<https://wg21.link/P0593R6>), a criação implícita de objetos era considerada ocorrendo ao criar um array de bytes ou invocar uma [função de alocação](<#/doc/memory/new/operator_new>) (que é possivelmente definida pelo usuário e [`constexpr`](<#/doc/language/constexpr>)) durante a avaliação de constante. No entanto, tal permissão causou indeterminismo na avaliação de constante, o que era indesejado e inviável em alguns aspectos. Como resultado, [P2747R2](<https://wg21.link/P2747R2>) proibiu tal criação implícita de objetos na avaliação de constante. Intencionalmente tratamos essa mudança como um relatório de defeito, embora o documento completo não seja.

### Relatórios de defeito
Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 633](<https://cplusplus.github.io/CWG/issues/633.html>) | C++98 | variáveis podiam ser apenas objetos | elas também podem ser referências
[CWG 734](<https://cplusplus.github.io/CWG/issues/734.html>) | C++98 | era não especificado se variáveis definidas no mesmo escopo que têm garantia de ter o mesmo valor podem ter o mesmo endereço | o endereço é garantido ser diferente se seus tempos de vida se sobrepõem, independentemente de seus valores
[CWG 1189](<https://cplusplus.github.io/CWG/issues/1189.html>) | C++98 | dois subobjetos de classe base do mesmo tipo podiam ter o mesmo endereço | eles sempre têm endereços distintos
[CWG 1861](<https://cplusplus.github.io/CWG/issues/1861.html>) | C++98 | para bit-fields de tamanho excessivo de tipos de caracteres estreitos, todos os bits da representação de objeto ainda participavam da representação de valor | permite bits de preenchimento
[CWG 2489](<https://cplusplus.github.io/CWG/issues/2489.html>) | C++98 | char[] não pode fornecer armazenamento, mas objetos podiam ser criados implicitamente dentro de seu armazenamento | objetos não podem ser criados implicitamente dentro do armazenamento de char[]
[CWG 2519](<https://cplusplus.github.io/CWG/issues/2519.html>) | C++98 | a definição de representação de objeto não abordava bit-fields | aborda bit-fields
[CWG 2719](<https://cplusplus.github.io/CWG/issues/2719.html>) | C++98 | o comportamento de criar um objeto em armazenamento desalinhado era incerto | o comportamento é indefinido neste caso
[CWG 2753](<https://cplusplus.github.io/CWG/issues/2753.html>) | C++11 | era incerto se um array de apoio de uma initializer list pode compartilhar armazenamento com um string literal | eles podem compartilhar armazenamento
[CWG 2795](<https://cplusplus.github.io/CWG/issues/2795.html>) | C++98 | ao determinar se dois objetos com tempos de vida sobrepostos podem ter o mesmo endereço, se algum deles for um subobjeto de tamanho zero, eles poderiam ter tipos distintos similares | permite apenas tipos não-similares
[P0593R6](<https://wg21.link/P0593R6>) | C++98 | o modelo de objeto anterior não suportava muitos idiomas úteis exigidos pela standard library e não era compatível com tipos efetivos em C | criação implícita de objetos adicionada

### Veja também
[Documentação C](<#/>) para Objeto
---