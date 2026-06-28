# std::sig_atomic_t

Definido no cabeçalho `[<csignal>](<#/doc/header/csignal>)`

```c
typedef /* não especificado */ sig_atomic_t;
```

Um tipo inteiro que pode ser acessado como uma entidade atômica mesmo na presença de interrupções assíncronas feitas por sinais.

### Notas

Até C++11, que introduziu [std::atomic](<#/doc/atomic/atomic>) e [std::atomic_signal_fence](<#/doc/atomic/atomic_signal_fence>), a única coisa que um programa estritamente conforme poderia fazer em um manipulador de sinal era atribuir um valor a uma variável volatile static std::sig_atomic_t e retornar prontamente.

### Veja também

[ signal](<#/doc/utility/program/signal>) | define um manipulador de sinal para um sinal específico
(função)
[ atomic_signal_fence](<#/doc/atomic/atomic_signal_fence>)(C++11) | barreira entre uma thread e um manipulador de sinal executado na mesma thread
(função)
[Documentação C](<#/>) para sig_atomic_t