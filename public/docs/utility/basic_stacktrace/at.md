# std::basic_stacktrace&lt;Allocator&gt;::at

const_reference at( size_type pos ) const; | | (desde C++23)

Retorna uma referência para a entrada na localização especificada `pos`, com verificação de limites.

Se `pos` não estiver dentro do intervalo do stacktrace, uma exceção do tipo [std::out_of_range](<#/doc/error/out_of_range>) é lançada.

### Parâmetros

- **pos** — posição da entrada do stacktrace a ser retornada

### Valor de retorno

Referência para a entrada solicitada.

### Exceções

[std::out_of_range](<#/doc/error/out_of_range>) se pos >= size().

### Complexidade

Constante.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ operator[]](<#/doc/utility/basic_stacktrace/operator_at>) | acessa a entrada especificada do stacktrace
(função membro pública)