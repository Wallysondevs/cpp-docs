# Requisitos Nomeados

Os _requisitos nomeados_ listados nesta página são os requisitos nomeados usados no texto normativo do padrão C++ para definir as expectativas da standard library.

A responsabilidade de garantir que os templates da biblioteca sejam instanciados com argumentos de template que satisfaçam esses requisitos é do programador. A falha em fazê-lo pode resultar em diagnósticos de compilador muito complexos.

Alguns desses requisitos são formalizados em C++20 usando o recurso de linguagem [concepts](<#/doc/language/constraints>).

### Básico

---
[DefaultConstructible](<#/doc/named_req/DefaultConstructible>) | especifica que um objeto do tipo pode ser construído por padrão
(named requirement)
[MoveConstructible](<#/doc/named_req/MoveConstructible>)(C++11) | especifica que um objeto do tipo pode ser construído a partir de um rvalue
(named requirement)
[CopyConstructible](<#/doc/named_req/CopyConstructible>) | especifica que um objeto do tipo pode ser construído a partir de um lvalue
(named requirement)
[MoveAssignable](<#/doc/named_req/MoveAssignable>)(C++11) | especifica que um objeto do tipo pode ser atribuído a partir de um rvalue
(named requirement)
[CopyAssignable](<#/doc/named_req/CopyAssignable>) | especifica que um objeto do tipo pode ser atribuído a partir de um lvalue
(named requirement)
[Destructible](<#/doc/named_req/Destructible>) | especifica que um objeto do tipo pode ser destruído
(named requirement)

### Propriedades de Tipo

Nota: o padrão não define requisitos nomeados com nomes especificados nesta subcategoria. Estas são categorias de tipo definidas pela linguagem central. Elas são incluídas aqui como requisitos nomeados apenas por consistência.
[ScalarType](<#/doc/named_req/ScalarType>) | tipos de objeto que não são tipos de array ou tipos de classe
(named requirement)
[PODType](<#/doc/named_req/PODType>)(obsoleto em C++20) | tipos POD (Plain Old Data), compatíveis com struct C
(named requirement)
[TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>)(C++11) | objetos desses tipos podem manter seus valores após copiar seus bytes subjacentes
(named requirement)
[TrivialType](<#/doc/named_req/TrivialType>)(C++11)(obsoleto em C++26) | objetos desses tipos podem ser trivialmente construídos e copiados
(named requirement)
[StandardLayoutType](<#/doc/named_req/StandardLayoutType>)(C++11) | esses tipos são úteis para comunicação com código escrito em outras linguagens de programação
(named requirement)
[ImplicitLifetimeType](<#/doc/named_req/ImplicitLifetimeType>) | objetos desses tipos podem ser criados implicitamente, e seus tempos de vida podem ser iniciados implicitamente
(named requirement)

### Abrangentes da Biblioteca

[BooleanTestable](<#/doc/named_req/BooleanTestable>) | operações booleanas (operator&&, operator||, e operator!) têm semântica usual
(named requirement)
[EqualityComparable](<#/doc/named_req/EqualityComparable>) | `operator==` é uma relação de equivalência
(named requirement)
[LessThanComparable](<#/doc/named_req/LessThanComparable>) | `operator<` é uma relação de ordenação fraca estrita
(named requirement)
[Swappable](<#/doc/named_req/Swappable>) | pode ser trocado com uma chamada de função não-membro não qualificada swap()
(named requirement)
[ValueSwappable](<#/doc/named_req/ValueSwappable>)(C++11) | um [LegacyIterator](<#/doc/named_req/Iterator>) que desreferencia para um tipo [Swappable](<#/doc/named_req/Swappable>)
(named requirement)
[NullablePointer](<#/doc/named_req/NullablePointer>)(C++11) | um tipo semelhante a ponteiro que suporta um valor nulo
(named requirement)
[Hash](<#/doc/named_req/Hash>)(C++11) | um [FunctionObject](<#/doc/named_req/FunctionObject>) que, para entradas com valores diferentes, tem baixa probabilidade de produzir a mesma saída
(named requirement)
[Allocator](<#/doc/named_req/Allocator>) | um tipo de classe que contém informações de alocação
(named requirement)
[FunctionObject](<#/doc/named_req/FunctionObject>) | um objeto que pode ser chamado com a sintaxe de chamada de função
(named requirement)
[Callable](<#/doc/named_req/Callable>) | um tipo para o qual a operação invoke é definida
(named requirement)
[Predicate](<#/doc/named_req/Predicate>) | um [FunctionObject](<#/doc/named_req/FunctionObject>) que retorna um valor conversível para bool para um argumento sem modificá-lo
(named requirement)
[BinaryPredicate](<#/doc/named_req/BinaryPredicate>) | um [FunctionObject](<#/doc/named_req/FunctionObject>) que retorna um valor conversível para bool para dois argumentos sem modificá-los
(named requirement)
[Compare](<#/doc/named_req/Compare>) | um [BinaryPredicate](<#/doc/named_req/BinaryPredicate>) que estabelece uma relação de ordenação
(named requirement)

### Container

---
[Container](<#/doc/named_req/Container>) | estrutura de dados que permite acesso a elementos usando iterators
(named requirement)
[ReversibleContainer](<#/doc/named_req/ReversibleContainer>) | container que usa iterators bidirecionais
(named requirement)
[AllocatorAwareContainer](<#/doc/named_req/AllocatorAwareContainer>)(C++11) | container que usa um allocator
(named requirement)
[SequenceContainer](<#/doc/named_req/SequenceContainer>) | container com elementos armazenados linearmente
(named requirement)
[ContiguousContainer](<#/doc/named_req/ContiguousContainer>)(C++17) | container com elementos armazenados em endereços de memória adjacentes
(named requirement)
[AssociativeContainer](<#/doc/named_req/AssociativeContainer>) | container que armazena elementos associando-os a chaves
(named requirement)
[UnorderedAssociativeContainer](<#/doc/named_req/UnorderedAssociativeContainer>)(C++11) | container que armazena elementos em buckets associando-os a chaves
(named requirement)

##### Elemento de Container

[DefaultInsertable](<#/doc/named_req/DefaultInsertable>)(C++11) | elemento pode ser construído por padrão em armazenamento não inicializado
(named requirement)
[CopyInsertable](<#/doc/named_req/CopyInsertable>)(C++11) | elemento pode ser construído por cópia em armazenamento não inicializado
(named requirement)
[MoveInsertable](<#/doc/named_req/MoveInsertable>)(C++11) | elemento pode ser construído por move em armazenamento não inicializado
(named requirement)
[EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>)(C++11) | elemento pode ser construído em armazenamento não inicializado
(named requirement)
[Erasable](<#/doc/named_req/Erasable>)(C++11) | elemento pode ser destruído usando um allocator
(named requirement)

### Iterator

[LegacyIterator](<#/doc/named_req/Iterator>) | conceito geral para acessar dados dentro de alguma estrutura de dados
(named requirement)
[LegacyInputIterator](<#/doc/named_req/InputIterator>) | iterator que pode ser usado para ler dados
(named requirement)
[LegacyOutputIterator](<#/doc/named_req/OutputIterator>) | iterator que pode ser usado para escrever dados
(named requirement)
[LegacyForwardIterator](<#/doc/named_req/ForwardIterator>) | iterator que pode ser usado para ler dados múltiplas vezes
(named requirement)
[LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>) | iterator que pode ser incrementado e decrementado
(named requirement)
[LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>) | iterator que pode ser avançado em tempo constante
(named requirement)
[LegacyContiguousIterator](<#/doc/named_req/ContiguousIterator>)(C++17) | iterator para elementos alocados contiguamente
(named requirement)
[ConstexprIterator](<#/doc/named_req/ConstexprIterator>)(C++20) | iterator que pode ser usado durante a avaliação de expressão constante
(named requirement)

### Funções de E/S de Stream

[UnformattedInputFunction](<#/doc/named_req/UnformattedInputFunction>) | uma função de entrada de stream que não ignora espaços em branco iniciais e conta os caracteres processados
(named requirement)
[FormattedInputFunction](<#/doc/named_req/FormattedInputFunction>) | uma função de entrada de stream que ignora espaços em branco iniciais
(named requirement)
[UnformattedOutputFunction](<#/doc/named_req/UnformattedOutputFunction>) | uma função básica de saída de stream
(named requirement)
[FormattedOutputFunction](<#/doc/named_req/FormattedOutputFunction>) | uma função de saída de stream que define failbit em erros e retorna uma referência para o stream
(named requirement)

### Formatters

[BasicFormatter](<#/doc/named_req/BasicFormatter>)(C++20) | abstrai operações de formatação para um dado tipo de argumento de formatação e tipo de caractere
(named requirement)
[Formatter](<#/doc/named_req/Formatter>)(C++20) | define funções usadas pela [biblioteca de formatação](<#/doc/utility/format>)
(named requirement)

### Geração de Números Aleatórios

[SeedSequence](<#/doc/named_req/SeedSequence>)(C++11) | consome uma sequência de inteiros e produz uma sequência de valores unsigned de 32 bits
(named requirement)
[UniformRandomBitGenerator](<#/doc/named_req/UniformRandomBitGenerator>)(C++11) | retorna inteiros unsigned aleatórios uniformemente distribuídos
(named requirement)
[RandomNumberEngine](<#/doc/named_req/RandomNumberEngine>)(C++11) | um [UniformRandomBitGenerator](<#/doc/named_req/UniformRandomBitGenerator>) determinístico, definido pela seed
(named requirement)
[RandomNumberEngineAdaptor](<#/doc/named_req/RandomNumberEngineAdaptor>)(C++11) | um [RandomNumberEngine](<#/doc/named_req/RandomNumberEngine>) que transforma a saída de outro [RandomNumberEngine](<#/doc/named_req/RandomNumberEngine>)
(named requirement)
[RandomNumberDistribution](<#/doc/named_req/RandomNumberDistribution>)(C++11) | retorna números aleatórios distribuídos de acordo com uma dada função de densidade de probabilidade matemática
(named requirement)

### Concorrência

[BasicLockable](<#/doc/named_req/BasicLockable>)(C++11) | fornece semântica de propriedade exclusiva para agentes de execução (ou seja, threads)
(named requirement)
[Lockable](<#/doc/named_req/Lockable>)(C++11) | um [BasicLockable](<#/doc/named_req/BasicLockable>) que suporta tentativa de aquisição de lock
(named requirement)
[TimedLockable](<#/doc/named_req/TimedLockable>)(C++11) | um [Lockable](<#/doc/named_req/Lockable>) que suporta aquisição de lock com tempo limite
(named requirement)
[SharedLockable](<#/doc/named_req/SharedLockable>)(C++14) | fornece semântica de propriedade compartilhada para agentes de execução (ou seja, threads)
(named requirement)
[SharedTimedLockable](<#/doc/named_req/SharedTimedLockable>)(C++14) | um [SharedLockable](<#/doc/named_req/SharedLockable>) que suporta aquisição de lock com tempo limite
(named requirement)
[Mutex](<#/doc/named_req/Mutex>)(C++11) | um [Lockable](<#/doc/named_req/Lockable>) que protege contra data races e sincronização sequencialmente consistente
(named requirement)
[TimedMutex](<#/doc/named_req/TimedMutex>)(C++11) | um [TimedLockable](<#/doc/named_req/TimedLockable>) que protege contra data races e sincronização sequencialmente consistente
(named requirement)
[SharedMutex](<#/doc/named_req/SharedMutex>)(C++17) | um [Mutex](<#/doc/named_req/Mutex>) que suporta semântica de propriedade compartilhada
(named requirement)
[SharedTimedMutex](<#/doc/named_req/SharedTimedMutex>)(C++14) | um [TimedMutex](<#/doc/named_req/TimedMutex>) que suporta semântica de propriedade compartilhada
(named requirement)

### Ranges

[RangeAdaptorObject](<#/doc/named_req/RangeAdaptorObject>)(C++20) | um [FunctionObject](<#/doc/named_req/FunctionObject>) que cria um [range adaptor](<#/doc/ranges>) a partir de um [`viewable_range`](<#/doc/ranges/viewable_range>) e argumentos adicionais
(named requirement)
[RangeAdaptorClosureObject](<#/doc/named_req/RangeAdaptorClosureObject>)(C++20) | um [FunctionObject](<#/doc/named_req/FunctionObject>) que suporta o operador pipe
(named requirement)

### Personalização de View Multidimensional

[LayoutMapping](<#/doc/named_req/LayoutMapping>)(C++23) | controla o mapeamento de índice multidimensional em mdspan
(named requirement)
[LayoutMappingPolicy](<#/doc/named_req/LayoutMappingPolicy>)(C++23) | uma policy que contém os requisitos de [LayoutMapping](<#/doc/named_req/LayoutMapping>)
(named requirement)
[AccessorPolicy](<#/doc/named_req/AccessorPolicy>)(C++23) | uma policy que controla o acesso ao manipulador de dados em mdspan
(named requirement)

### Outros

[UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>)(C++11) | descreve uma propriedade de um tipo
(named requirement)
[BinaryTypeTrait](<#/doc/named_req/BinaryTypeTrait>)(C++11) | descreve uma relação entre dois tipos
(named requirement)
[TransformationTrait](<#/doc/named_req/TransformationTrait>)(C++11) | modifica uma propriedade de um tipo
(named requirement)
[Clock](<#/doc/named_req/Clock>)(C++11) | agrega uma duration, um time point e uma função para obter o time point atual
(named requirement)
[TrivialClock](<#/doc/named_req/TrivialClock>)(C++11) | um [Clock](<#/doc/named_req/Clock>) que não lança exceções
(named requirement)
[CharTraits](<#/doc/named_req/CharTraits>) | define tipos e funções para um tipo de caractere
(named requirement)
[BitmaskType](<#/doc/named_req/BitmaskType>) | bitset, inteiro ou enumeração
(named requirement)
[NumericType](<#/doc/named_req/NumericType>) | um tipo para o qual a inicialização é efetivamente igual à atribuição
(named requirement)
[RegexTraits](<#/doc/named_req/RegexTraits>)(C++11) | define tipos e funções usadas pela [biblioteca de expressões regulares](<#/doc/regex>)
(named requirement)
[LiteralType](<#/doc/named_req/LiteralType>)(C++11) | um tipo com construtor constexpr
(named requirement)
| Esta seção está incompleta
Razão: Algum outro requisito faltando?