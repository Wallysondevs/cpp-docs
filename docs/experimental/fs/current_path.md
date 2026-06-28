# std::experimental::filesystem::current_path

Definido no header `<experimental/filesystem>`

```cpp
path current_path();  // (1)
path current_path( error_code& ec );  // (2)
void current_path( const path& p );  // (3)
void current_path( const path& p, error_code& ec );  // (4)
```

  
Retorna ou altera o caminho atual.

1,2) Retorna o caminho absoluto do diretório de trabalho atual, obtido como se por POSIX [getcwd](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/getcwd.html>). (2) retorna path() se ocorrer um erro.

3,4) Altera o diretório de trabalho atual para p, como se por POSIX [chdir](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/chdir.html>).

### Parâmetros

p  |  \-  |  caminho para o qual alterar o diretório de trabalho atual   
---|---|---
ec  |  \-  |  parâmetro de saída para relatório de erros nas sobrecargas que não lançam exceções   
  
### Valor de retorno

1,2) Retorna o diretório de trabalho atual.

3,4) (nenhum)

### Exceções

1,2) A sobrecarga que não recebe um parâmetro error_code& lança [filesystem_error](<#/doc/experimental/fs/filesystem_error>) em erros subjacentes da API do SO, construída com o código de erro do SO como argumento do código de erro. [std::bad_alloc](<#/doc/memory/new/bad_alloc>) pode ser lançada se a alocação de memória falhar. A sobrecarga que recebe um parâmetro error_code& o define para o código de erro da API do SO se uma chamada de API do SO falhar, e executa ec.clear() se nenhum erro ocorrer. Esta sobrecarga possui

[`noexcept`](<#/doc/language/noexcept_spec>) especificação:

noexcept

3,4) A sobrecarga que não recebe um parâmetro error_code& lança [filesystem_error](<#/doc/experimental/fs/filesystem_error>) em erros subjacentes da API do SO, construída com p como o primeiro argumento e o código de erro do SO como argumento do código de erro. [std::bad_alloc](<#/doc/memory/new/bad_alloc>) pode ser lançada se a alocação de memória falhar. A sobrecarga que recebe um parâmetro error_code& o define para o código de erro da API do SO se uma chamada de API do SO falhar, e executa ec.clear() se nenhum erro ocorrer. Esta sobrecarga possui

[`noexcept`](<#/doc/language/noexcept_spec>) especificação:

noexcept

### Notas

O diretório de trabalho atual é o diretório que é usado como local de partida na resolução de caminhos para caminhos relativos. Um único diretório de trabalho atual está associado a todo o processo.

O diretório de trabalho atual é um estado global perigoso do programa. O comportamento de várias funções relacionadas a entrada/saída de arquivos é afetado pelo valor do caminho atual. O caminho atual pode ser alterado inesperadamente por qualquer componente do programa, incluindo várias bibliotecas externas ou outras threads.

### Veja também

| Esta seção está incompleta   