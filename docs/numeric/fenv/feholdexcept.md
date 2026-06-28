# std::feholdexcept

Definido no cabeçalho `[<cfenv>](<#/doc/header/cfenv>)`

```c
int feholdexcept( std::fenv_t* envp )
```

Primeiro, salva o ambiente de ponto flutuante atual no objeto apontado por `envp` (similar a [std::fegetenv](<#/doc/numeric/fenv/feenv>)), então limpa todas as flags de status de ponto flutuante, e então instala o modo non-stop: futuras exceções de ponto flutuante não interromperão a execução (não farão trap), até que o ambiente de ponto flutuante seja restaurado por [std::feupdateenv](<#/doc/numeric/fenv/feupdateenv>) ou [std::fesetenv](<#/doc/numeric/fenv/feenv>).

Esta função pode ser usada no início de uma sub-rotina que deve ocultar as exceções de ponto flutuante que ela pode levantar do chamador. Se apenas algumas exceções devem ser suprimidas, enquanto outras devem ser reportadas, o modo non-stop é geralmente encerrado com uma chamada para [std::feupdateenv](<#/doc/numeric/fenv/feupdateenv>) após limpar as exceções indesejadas.

### Parâmetros

- **envp** — ponteiro para o objeto do tipo [std::fenv_t](<#/doc/numeric/fenv>) onde o ambiente de ponto flutuante será armazenado

### Valor de retorno

`0` em caso de sucesso, diferente de zero caso contrário.

### Ver também

[ feupdateenv](<#/doc/numeric/fenv/feupdateenv>)(C++11) | restaura o ambiente de ponto flutuante e levanta as exceções previamente levantadas
(função)
[ fegetenvfesetenv](<#/doc/numeric/fenv/feenv>)(C++11) | salva ou restaura o ambiente de ponto flutuante atual
(função)
[ FE_DFL_ENV](<#/doc/numeric/fenv/FE_DFL_ENV>)(C++11) | ambiente de ponto flutuante padrão
(macro constante)
[Documentação C](<#/>) para feholdexcept