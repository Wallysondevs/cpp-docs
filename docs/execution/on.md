# std::execution::on

Definido no cabeçalho `[<execution>](<#/doc/header/execution>)`

```c
execution::sender auto on( execution::scheduler auto sched,
execution::sender auto snd );
```

### Parâmetros

- **sched** — fornece o agente de execução no qual o sender será executado
- **snd** — trabalho a ser executado no recurso de execução associado a sched

### Valor de retorno

Retorna um sender que, quando iniciado, iniciará o sender fornecido em um agente de execução pertencente ao recurso de execução associado ao scheduler fornecido.

O sender retornado não possui schedulers de conclusão.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo