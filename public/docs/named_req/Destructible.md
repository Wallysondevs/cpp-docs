# Requisitos nomeados C++: Destrutível

Especifica que uma instância do tipo pode ser destruída.

### Requisitos

O tipo `T` satisfaz Destrutível se

Dado

  * `u`, uma expressão do tipo `T`.

As seguintes expressões devem ser válidas e ter seus efeitos especificados.

Expressão | Pós-condições
---|---
u.~T() | Todos os recursos pertencentes a `u` são recuperados, nenhuma exceção é lançada.

### Notas

Destrutores são chamados implicitamente ao final do [tempo de vida do objeto](<#/doc/language/lifetime>), como ao sair do [escopo](<#/doc/language/scope>) ou pela [expressão delete](<#/doc/language/delete>). A chamada explícita do destrutor, como mostrado na tabela de requisitos de tipo, é rara.

Graças à [chamada de pseudo-destrutor](<#/doc/language/operator_member_access>), todos os tipos escalares satisfazem o requisito de Destrutível, enquanto tipos array e tipos referência não. Note que [std::is_destructible](<#/doc/types/is_destructible>) permite tipos array e tipos referência.

### Veja também

[ is_destructibleis_trivially_destructibleis_nothrow_destructible](<#/doc/types/is_destructible>)(C++11)(C++11)(C++11) | verifica se um tipo possui um destrutor não-deletado
(modelo de classe)
[ destructible](<#/doc/concepts/destructible>)(C++20) | especifica que um objeto do tipo pode ser destruído
(concept)