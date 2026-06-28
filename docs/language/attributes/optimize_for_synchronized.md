# Atributo C++: optimize_for_synchronized (TM TS)

Indica que a definição da função deve ser otimizada para invocação a partir de uma [instrução sincronizada](<#/doc/language/transactional_memory>).

### Sintaxe

---
`[[optimize_for_synchronized]]`

### Explicação

Aplica-se ao nome sendo declarado em uma declaração de função, que deve ser a primeira declaração da função.

Indica que a definição da função deve ser otimizada para invocação a partir de uma [instrução sincronizada](<#/doc/language/transactional_memory>). Em particular, evita serializar blocos sincronizados que fazem uma chamada a uma função que é segura para transações para a maioria das chamadas, mas não para todas as chamadas.

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Referências

* Transactional Memory TS (ISO/IEC TS 19841:2015):

* 7.6.6 Atributo para otimização em blocos sincronizados [dcl.attr.sync]
