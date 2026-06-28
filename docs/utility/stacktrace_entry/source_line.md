# std::stacktrace_entry::source_line

[std::uint_least32_t](<#/doc/types/integer>) source_line() const; | | (desde C++23)

Retorna um número de linha baseado em 1 que se relaciona lexicalmente com a avaliação representada por *this, ou 0 em caso de falha que não seja falha de alocação, por exemplo, quando *this está vazio.

Ou [`source_file`](<#/doc/utility/stacktrace_entry/source_file>) retorna o nome do arquivo fonte presumido e `source_line` retorna o número de linha presumido, ou [`source_file`](<#/doc/utility/stacktrace_entry/source_file>) retorna o nome do arquivo fonte real e `source_line` retorna o número de linha real.

### Parâmetros

(nenhum)

### Valor de retorno

O número de linha especificado acima em caso de sucesso, 0 em caso de falha que não seja falha de alocação.

### Exceções

Lança [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a memória para as estruturas de dados internas não puder ser alocada.

### Observações

O número de linha presumido é o que a macro predefinida [`__LINE__`](<#/doc/preprocessor/replace>) se expande, e pode ser alterado pela diretiva [` #line`](<#/doc/preprocessor/line>).

| Esta seção está incompleta
Razão: a definição de "número de linha real" está faltando ([LWG issue 3507](<https://cplusplus.github.io/LWG/issue3507>))

Esta função não é exigida como noexcept porque obter a linha fonte requer alocação em algumas plataformas.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ line](<#/doc/utility/source_location/line>) | retorna o número de linha representado por este objeto
(função membro pública de `std::source_location`)