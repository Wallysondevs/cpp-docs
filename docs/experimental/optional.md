# std::experimental::optional

Definido no cabeçalho `[<experimental/optional>](<#/doc/header/experimental/optional>)`

```c
template< class T >
class optional;
```

O template de classe `std::experimental::optional` gerencia um valor contido _opcional_, ou seja, um valor que pode ou não estar presente.

Um caso de uso comum para `optional` é o valor de retorno de uma função que pode falhar. Ao contrário de outras abordagens, como [std::pair](<#/doc/utility/pair>)<T,bool>, `optional` lida bem com objetos caros de construir e é mais legível, pois a intenção é expressa explicitamente.

Qualquer instância de `optional<T>` em qualquer momento dado ou _contém um valor_ ou _não contém um valor_.

Se um `optional<T>` _contém um valor_, o valor é garantido ser alocado como parte da pegada de memória do objeto `optional`, ou seja, nenhuma alocação de memória dinâmica jamais ocorre. Assim, um objeto `optional` modela um objeto, não um ponteiro, mesmo que os [operator*()](<#/doc/experimental/optional/operator_star_>) e [operator->()](<#/doc/experimental/optional/operator_star_>) estejam definidos.

Quando um objeto do tipo optional&lt;T&gt; é [convertido contextualmente para bool](<#/doc/language/implicit_cast>), a conversão retorna true se o objeto _contém um valor_ e false se ele _não contém um valor_.

O objeto `optional` _contém um valor_ nas seguintes condições:

  * O objeto é inicializado com um valor do tipo `T`.
  * O objeto é atribuído a partir de outro `optional` que _contém um valor_.

O objeto _não contém um valor_ nas seguintes condições:

  * O objeto é inicializado por padrão.
  * O objeto é inicializado com um valor de std::experimental::nullopt_t ou um objeto `optional` que _não contém um valor_.
  * O objeto é atribuído a partir de um valor de std::experimental::nullopt_t ou de um `optional` que _não contém um valor_.

### Parâmetros de template

- **T** — o tipo do valor para gerenciar o estado de inicialização. O tipo deve atender aos requisitos de [Destructible](<#/doc/named_req/Destructible>).

### Tipos de membro

Tipo de membro | Definição
---|---
`value_type` | `T`

### Funções de membro

[ (construtor)](<#/doc/experimental/optional/optional>) | constrói o objeto optional
(função membro pública)
[ (destrutor)](<#/doc/experimental/optional/~optional>) | destrói o valor contido, se houver um
(função membro pública)
[ operator=](<#/>) | atribui conteúdo
(função membro pública)

##### Observadores

[ operator->operator*](<#/doc/experimental/optional/operator_star_>) | acessa o valor contido
(função membro pública)
[ operator bool](<#/doc/experimental/optional/operator_bool>) | verifica se o objeto contém um valor
(função membro pública)
[ value](<#/doc/experimental/optional/value>) | retorna o valor contido
(função membro pública)
[ value_or](<#/doc/experimental/optional/value_or>) | retorna o valor contido se disponível, outro valor caso contrário
(função membro pública)

##### Modificadores

[ swap](<#/doc/experimental/optional/swap>) | troca o conteúdo
(função membro pública)
[ emplace](<#/doc/experimental/optional/emplace>) | constrói o valor contido no local
(função membro pública)

### Objetos de membro

Nome do membro | Definição
---|---
`val` (private) | ponteiro para o valor contido (que aponta para um membro de dados do mesmo objeto), o nome é apenas para exposição

### Funções não-membro

[ operator==operator!=operator<operator<=operator>operator>=](<#/doc/experimental/optional/operator_cmp>) | compara objetos `optional`
(template de função)
[ make_optional](<#/doc/experimental/optional/make_optional>) | cria um objeto `optional`
(template de função)
[ std::swap(std::experimental::optional)](<#/doc/experimental/optional/swap2>) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(função)

### Classes auxiliares

[ std::hash<std::experimental::optional>](<#/doc/experimental/optional/hash>) | especializa o algoritmo [std::hash](<#/doc/utility/hash>)
(especialização de template de classe)
[ nullopt_t](<#/doc/experimental/optional/nullopt_t>)(library fundamentals TS) | indicador de tipo optional com estado não inicializado
(classe)
[ in_place_t](<#/doc/experimental/optional/in_place_t>)(library fundamentals TS) | tipo de tag de desambiguação para construção in-place de tipos optional
(classe)
[ bad_optional_access](<#/doc/experimental/optional/bad_optional_access>)(library fundamentals TS) | exceção indicando acesso verificado a um optional que não contém um valor
(classe)

### Objetos auxiliares

[ nullopt](<#/doc/experimental/optional/nullopt>)(library fundamentals TS) | um objeto do tipo `nullopt_t`
(função)
[ in_place](<#/doc/experimental/optional/in_place>)(library fundamentals TS) | um objeto do tipo [std::experimental::in_place_t](<#/doc/experimental/optional/in_place_t>)
(função)