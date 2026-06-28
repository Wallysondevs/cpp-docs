# std::filesystem::recursive_directory_iterator::pop

```cpp
void pop();  // (1) (desde C++17)
void pop( std::error_code& ec );  // (2) (desde C++17)
```

Move o iterator um nível acima na hierarquia de diretórios. Invalida todas as cópias do valor anterior de *this.

Se o diretório pai estiver fora da hierarquia de diretórios que está sendo iterada (ou seja, depth() == 0), define *this como um iterator de diretório final.

### Parâmetros

- **ec** — código de erro para armazenar o status do erro

### Valor de retorno

(nenhum)

### Exceções

Qualquer sobrecarga não marcada como `noexcept` pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação de memória falhar.

1) Lança [std::filesystem::filesystem_error](<#/doc/filesystem/filesystem_error>) em erros subjacentes da API do SO, construído com o código de erro do SO como argumento do código de erro.

2) Define um parâmetro [std::error_code](<#/doc/error/error_code>)& para o código de erro da API do SO se uma chamada de API do SO falhar, e executa ec.[`clear`](<#/doc/error/error_code/clear>)() se nenhum erro ocorrer.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo