# std::stacktrace_entry::source_file

[std::string](<#/doc/string/basic_string>) source_file() const; | | (desde C++23)

Retorna o nome presumido ou real do arquivo fonte que contém lexicalmente a expressão ou instrução cuja avaliação é representada por *this, ou uma string vazia em caso de falha que não seja falha de alocação, por exemplo, quando *this está vazio.

Ou `source_file` retorna o nome presumido do arquivo fonte e [`source_line`](<#/doc/utility/stacktrace_entry/source_line>) retorna o número da linha presumido, ou `source_file` retorna o nome real do arquivo fonte e [`source_line`](<#/doc/utility/stacktrace_entry/source_line>) retorna o número da linha real.

### Parâmetros

(nenhum)

### Valor de retorno

O nome do arquivo fonte especificado acima em caso de sucesso, uma string vazia em caso de falha que não seja falha de alocação.

### Exceções

Lança [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a memória para as estruturas de dados internas ou para a string resultante não puder ser alocada.

### Notas

O nome presumido do arquivo fonte é o que a macro predefinida [`__FILE__`](<#/doc/preprocessor/replace>) se expande, e pode ser alterado pela diretiva [` #line`](<#/doc/preprocessor/line>).

| Esta seção está incompleta
Razão: a definição de "nome real" está faltando ([LWG issue 3507](<https://cplusplus.github.io/LWG/issue3507>))

O suporte a allocators customizados para esta função não é fornecido, porque as implementações geralmente exigem alocações específicas da plataforma, chamadas de sistema e muito trabalho intensivo de CPU, enquanto um allocator customizado não oferece benefícios para esta função, pois as operações específicas da plataforma levam uma ordem de magnitude mais tempo do que a alocação.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ file_name](<#/doc/utility/source_location/file_name>) | retorna o nome do arquivo representado por este objeto
(função membro pública de `std::source_location`)