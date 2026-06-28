# std::stacktrace_entry::description

[std::string](<#/doc/string/basic_string>) description() const; | | (desde C++23)

Retorna uma descrição da avaliação representada por *this em caso de sucesso, ou uma string vazia em caso de falha que não seja falha de alocação, por exemplo, quando *this está vazio.

### Parâmetros

(nenhum)

### Valor de retorno

Uma descrição da avaliação representada em caso de sucesso, uma string vazia em caso de falha que não seja falha de alocação.

### Exceções

Lança [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a memória para as estruturas de dados internas ou para a string resultante não puder ser alocada.

### Observações

O suporte a alocadores personalizados para esta função não é fornecido, porque as implementações geralmente exigem alocações específicas da plataforma, chamadas de sistema e muito trabalho intensivo de CPU, enquanto um alocador personalizado não oferece benefícios para esta função, pois as operações específicas da plataforma levam uma ordem de magnitude mais tempo do que a alocação.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo