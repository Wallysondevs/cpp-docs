# std::fegetenv, std::fesetenv

Definido no cabeçalho `[<cfenv>](<#/doc/header/cfenv>)`

```c
int fegetenv( std::fenv_t* envp )
int fesetenv( const std::fenv_t* envp );
```

Gerencia o estado do ambiente de ponto flutuante.

1) Tenta armazenar o estado do ambiente de ponto flutuante no objeto apontado por `envp`.

2) Tenta estabelecer o ambiente de ponto flutuante a partir do objeto apontado por `envp`. O valor desse objeto deve ter sido obtido anteriormente por uma chamada a [std::feholdexcept](<#/doc/numeric/fenv/feholdexcept>) ou `std::fegetenv` ou ser uma constante macro de ponto flutuante. Se qualquer um dos flags de estado de ponto flutuante estiver definido em `envp`, eles se tornam definidos no ambiente (e são então testáveis com [std::fetestexcept](<#/doc/numeric/fenv/fetestexcept>)), mas as exceções de ponto flutuante correspondentes não são lançadas (a execução continua ininterrupta).

### Parâmetros

- **envp** — ponteiro para o objeto do tipo [std::fenv_t](<#/doc/numeric/fenv>) que contém o estado do ambiente de ponto flutuante

### Valor de retorno

​0​ em caso de sucesso, diferente de zero caso contrário.

### Veja também

[ feholdexcept](<#/doc/numeric/fenv/feholdexcept>)(C++11) | salva o ambiente, limpa todos os flags de estado e ignora todos os erros futuros
(função)
[ feupdateenv](<#/doc/numeric/fenv/feupdateenv>)(C++11) | restaura o ambiente de ponto flutuante e lança as exceções previamente lançadas
(função)
[ FE_DFL_ENV](<#/doc/numeric/fenv/FE_DFL_ENV>)(C++11) | ambiente de ponto flutuante padrão
(constante macro)
[Documentação C](<#/>) para fegetenv, fesetenv