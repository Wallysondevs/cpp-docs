# std::feupdateenv

Definido no cabeçalho `[<cfenv>](<#/doc/header/cfenv>)`

```c
int feupdateenv( const std::fenv_t* envp )
```

Primeiro, lembra as exceções de ponto flutuante atualmente levantadas, então restaura o ambiente de ponto flutuante do objeto apontado por `envp` (similar a [std::fesetenv](<#/doc/numeric/fenv/feenv>)), então levanta as exceções de ponto flutuante que foram salvas.

Esta função pode ser usada para encerrar o modo non-stop estabelecido por uma chamada anterior a [std::feholdexcept](<#/doc/numeric/fenv/feholdexcept>).

### Parâmetros

- **envp** — ponteiro para o objeto do tipo [std::fenv_t](<#/doc/numeric/fenv>) definido por uma chamada anterior a [std::feholdexcept](<#/doc/numeric/fenv/feholdexcept>) ou `std::fegetenv` ou igual a [FE_DFL_ENV](<#/doc/numeric/fenv/FE_DFL_ENV>)

### Valor de retorno

​0​ em caso de sucesso, diferente de zero caso contrário.

### Veja também

[ feholdexcept](<#/doc/numeric/fenv/feholdexcept>)(C++11) | salva o ambiente, limpa todos os flags de status e ignora todos os erros futuros
(função)
[ fegetenvfesetenv](<#/doc/numeric/fenv/feenv>)(C++11) | salva ou restaura o ambiente de ponto flutuante atual
(função)
[ FE_DFL_ENV](<#/doc/numeric/fenv/FE_DFL_ENV>)(C++11) | ambiente de ponto flutuante padrão
(macro constante)
[Documentação C](<#/>) para feupdateenv