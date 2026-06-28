# expressão delete

Destrói objeto(s) previamente alocado(s) pela [expressão new](<#/doc/language/new>) e libera a área de memória obtida.

### Sintaxe

---
`::`(opcional) `delete` expression | (1) |
---|---|---
`::`(opcional) `delete[]` expression | (2) |
- **expression** — um dos seguintes:

  * uma expressão de tipo de classe [implicitamente conversível contextualmente](<#/doc/language/implicit_cast>) para um ponteiro para tipo de objeto
  * um prvalue de ponteiro para tipo de objeto

1) Destrói um objeto não-array criado por uma [expressão new](<#/doc/language/new>).

2) Destrói um array criado por uma [expressão new[]](<#/doc/language/new>).

### Explicação

Dado o ponteiro avaliado a partir da expressão (após possíveis conversões) como ptr.

1) ptr deve ser um de
  * um ponteiro nulo,
  * um ponteiro para um objeto não-array criado por uma [expressão new](<#/doc/language/new>), ou
  * um ponteiro para um subobjeto base de um objeto não-array criado por uma [expressão new](<#/doc/language/new>).

O tipo apontado por ptr deve ser [similar](<#/doc/language/implicit_cast>) ao tipo do objeto (ou de um subobjeto base). Se ptr for qualquer outra coisa, incluindo se for um ponteiro obtido pela forma de array da [expressão new](<#/doc/language/new>), o comportamento é [indefinido](<#/doc/language/ub>).

2) ptr deve ser um ponteiro nulo ou um ponteiro cujo valor foi previamente obtido por uma forma de array da [expressão new](<#/doc/language/new>) cuja [função de alocação](<#/doc/memory/new/operator_new>) não era uma forma não-alocadora (ou seja, sobrecarga (10)).

O tipo apontado por ptr deve ser [similar](<#/doc/language/implicit_cast>) ao tipo do elemento do objeto array. Se ptr for qualquer outra coisa, incluindo se for um ponteiro obtido pela forma não-array da [expressão new](<#/doc/language/new>), o comportamento é [indefinido](<#/doc/language/ub>).

O resultado da expressão delete sempre tem o tipo void.

Se o objeto sendo deletado tiver um tipo de classe incompleto no ponto da deleção, e a classe completa tiver um destrutor não-trivial ou uma função de desalocação, o comportamento é indefinido(até C++26)o programa é malformado(desde C++26).

Se ptr não for um ponteiro nulo e a [função de desalocação](<#/doc/memory/new/operator_delete>) não for um destroying delete(desde C++20), a expressão delete invoca o [destrutor](<#/doc/language/destructor>) (se houver) para o objeto que está sendo destruído, ou para cada elemento do array que está sendo destruído (procedendo do último elemento para o primeiro elemento do array). O destrutor deve ser [acessível](<#/doc/language/access>) do ponto onde a expressão delete aparece.

Depois disso, independentemente de uma exceção ter sido lançada por qualquer destrutor, a expressão delete invoca a [função de desalocação](<#/doc/memory/new/operator_delete>): seja [operator delete](<#/doc/memory/new/operator_delete>) (primeira versão) ou [operator delete](<#/doc/memory/new/operator_delete>)[] (segunda versão), a menos que a expressão new correspondente tenha sido combinada com outra expressão new(desde C++14).

O nome da função de desalocação é [procurado](<#/doc/language/lookup>) no escopo do tipo dinâmico do objeto apontado por ptr, o que significa que as funções de desalocação específicas da classe, se presentes, são encontradas antes das globais. Se `::` estiver presente na expressão delete, apenas o namespace global é examinado por esta procura. Em qualquer caso, quaisquer declarações que não sejam de funções de desalocação usuais são descartadas.

Se alguma função de desalocação for encontrada, a função a ser chamada é selecionada da seguinte forma (veja [função de desalocação](<#/doc/memory/new/operator_delete>) para uma descrição mais detalhada dessas funções e seus efeitos):

  * Se pelo menos uma das funções de desalocação for um destroying delete, todos os non-destroying deletes são ignorados.

| (desde C++20)

  * Se o requisito de alinhamento do tipo exceder `__STDCPP_DEFAULT_NEW_ALIGNMENT__`, funções de desalocação cientes de alinhamento (com um parâmetro do tipo [std::align_val_t](<#/doc/memory/new/align_val_t>)) são preferidas. Para outros tipos, as funções de desalocação não cientes de alinhamento (sem um parâmetro do tipo [std::align_val_t](<#/doc/memory/new/align_val_t>)) são preferidas.

  * Se mais de uma função preferida for encontrada, apenas as funções preferidas são consideradas na próxima etapa.
  * Se nenhuma função preferida for encontrada, as não-preferidas são consideradas na próxima etapa.

  * Se apenas uma função restar, essa função é selecionada.

| (desde C++17)

  * Se as funções de desalocação encontradas forem específicas da classe, a função de desalocação específica da classe que não considera o tamanho (sem um parâmetro do tipo [std::size_t](<#/doc/types/size_t>)) é preferida em relação à função de desalocação específica da classe que considera o tamanho (com um parâmetro do tipo [std::size_t](<#/doc/types/size_t>)).

  * Caso contrário, a procura atingiu o escopo global, e:

  * Se o tipo for completo e se, apenas para a forma de array, o operando for um ponteiro para um tipo de classe com um destrutor não-trivial ou um array (possivelmente multidimensional) do mesmo, a função global ciente de tamanho (com um parâmetro do tipo [std::size_t](<#/doc/types/size_t>)) é selecionada.
  * Caso contrário, é não especificado se a função de desalocação global ciente de tamanho (com um parâmetro do tipo [std::size_t](<#/doc/types/size_t>)) ou a função de desalocação global não ciente de tamanho (sem um parâmetro do tipo [std::size_t](<#/doc/types/size_t>)) é selecionada.

| (desde C++14)

A função de desalocação selecionada deve ser [acessível](<#/doc/language/access>) do ponto onde a expressão delete aparece, a menos que a função de desalocação seja selecionada no ponto de definição do [destrutor virtual](<#/doc/language/virtual>) do [tipo dinâmico](<#/doc/language/type-id>).

O ponteiro para o bloco de armazenamento a ser recuperado é passado para a [função de desalocação](<#/doc/memory/new/operator_delete>) que foi selecionada pelo processo acima como o primeiro argumento. O tamanho do bloco é passado como o argumento opcional [std::size_t](<#/doc/types/size_t>). O requisito de alinhamento é passado como o argumento opcional [std::align_val_t](<#/doc/memory/new/align_val_t>).(desde C++17)

Se ptr for um valor de ponteiro nulo, nenhum destrutor é chamado, e a função de desalocação pode ou não ser chamada (é não especificado), mas as funções de desalocação padrão são garantidas a não fazer nada quando um ponteiro nulo é passado.

Se ptr for um ponteiro para um subobjeto de classe base do objeto que foi alocado com [new](<#/doc/language/new>), o destrutor da classe base deve ser [virtual](<#/doc/language/virtual>), caso contrário o comportamento é indefinido.

### Notas

Um ponteiro para void não pode ser deletado porque não é um ponteiro para um tipo de objeto.

Como um par de colchetes após a palavra-chave delete é sempre interpretado como a forma de array de uma expressão delete, uma [expressão lambda](<#/doc/language/lambda>) com uma lista de captura vazia imediatamente após delete deve ser envolvida por parênteses.
```cpp
    // delete []{ return new int; }(); // parse error
    delete ([]{ return new int; })();  // OK
```

| (desde C++11)

### Palavras-chave

[`delete`](<#/doc/keyword/delete>)

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 288](<https://cplusplus.github.io/CWG/issues/288.html>) | C++98 | para a primeira forma, o tipo estático do operando era comparado com seu tipo dinâmico | comparar o tipo estático do objeto a ser deletado com seu tipo dinâmico
[CWG 353](<https://cplusplus.github.io/CWG/issues/353.html>) | C++98 | se a função de desalocação seria invocada se o destrutor lançasse uma exceção era não especificado | sempre invocada
[CWG 599](<https://cplusplus.github.io/CWG/issues/599.html>) | C++98 | a primeira forma poderia aceitar um ponteiro nulo de qualquer tipo, incluindo ponteiros para funções | exceto ponteiros para tipos de objeto, todos os outros tipos de ponteiro são rejeitados
[CWG 1642](<https://cplusplus.github.io/CWG/issues/1642.html>) | C++98 | expressão poderia ser um lvalue de ponteiro | não permitido
[CWG 2474](<https://cplusplus.github.io/CWG/issues/2474.html>) | C++98 | deletar um ponteiro para um objeto de um tipo similar, mas diferente, resultava em comportamento indefinido | tornado bem definido
[CWG 2624](<https://cplusplus.github.io/CWG/issues/2624.html>) | C++98 | ponteiros obtidos de [operator new](<#/doc/memory/new/operator_new>)[] não-alocadores poderiam ser passados para delete[] | proibido
[CWG 2758](<https://cplusplus.github.io/CWG/issues/2758.html>) | C++98 | não estava claro como o controle de acesso era feito para a função de desalocação e o destrutor | tornado claro

### Veja também

  * [new](<#/doc/language/new>)
