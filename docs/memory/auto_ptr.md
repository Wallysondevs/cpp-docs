# std::auto_ptr

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< class T > class auto_ptr;
(removido em C++17)
template<> class auto_ptr<void>;
(removido em C++17)
```

`auto_ptr` é um smart pointer que gerencia um objeto obtido via [new expression](<#/doc/language/new>) e deleta esse objeto quando o próprio `auto_ptr` é destruído. Ele pode ser usado para fornecer segurança contra exceções para objetos alocados dinamicamente, para passar a propriedade de objetos alocados dinamicamente para funções e para retornar objetos alocados dinamicamente de funções.

Copiar um `auto_ptr` copia o ponteiro e transfere a propriedade para o destino: tanto a construção por cópia quanto a atribuição por cópia de `auto_ptr` modificam seus argumentos do lado direito, e a "cópia" não é igual ao original. Devido a essas semânticas de cópia incomuns, `auto_ptr` não pode ser colocado em containers padrão. [std::unique_ptr](<#/doc/memory/unique_ptr>) é preferido para este e outros usos.(desde C++11)

2) É fornecida uma especialização para o tipo void, ela declara o typedef `element_type`, mas nenhuma função membro.

Um template de classe adicional `auto_ptr_ref` é referenciado ao longo da documentação. É um tipo definido pela implementação que mantém uma referência para `auto_ptr`. A implementação pode fornecer o template com um nome diferente ou implementar as funções que o retornam ou o aceitam como parâmetro de outras maneiras.

### Tipos Membro

Tipo Membro | Definição
---|---
element_type | T

### Funções Membro

[ (construtor)](<#/doc/memory/auto_ptr/auto_ptr>) | cria um novo `auto_ptr`
(função membro pública)
[ (destrutor)](<#/doc/memory/auto_ptr/~auto_ptr>) | destrói um `auto_ptr` e o objeto gerenciado
(função membro pública)
[ operator=](<#/>) | transfere a propriedade de outro `auto_ptr`
(função membro pública)
[ operator auto_ptr&lt;Y&gt;operator auto_ptr_ref&lt;Y&gt;](<#/doc/memory/auto_ptr/operator_auto_ptr>) | converte o ponteiro gerenciado para um ponteiro de tipo diferente
(função membro pública)

##### Observadores

[ get](<#/doc/memory/auto_ptr/get>) | retorna um ponteiro para o objeto gerenciado
(função membro pública)
[ operator*operator->](<#/doc/memory/auto_ptr/operator_star_>) | acessa o objeto gerenciado
(função membro pública)

##### Modificadores

[ reset](<#/doc/memory/auto_ptr/reset>) | substitui o objeto gerenciado
(função membro pública)
[ release](<#/doc/memory/auto_ptr/release>) | libera a propriedade do objeto gerenciado
(função membro pública)