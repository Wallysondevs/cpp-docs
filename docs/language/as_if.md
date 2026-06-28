# A regra "as-if"

Permite quaisquer e todas as transformações de código que não alterem o comportamento observável do programa.

### Explicação

O compilador C++ tem permissão para realizar quaisquer alterações no programa, desde que o seguinte permaneça verdadeiro:

1) Em cada [ponto de sequência](<#/doc/language/eval_order>), os valores de todos os objetos [volatile](<#/doc/language/cv>) são estáveis (avaliações anteriores estão completas, novas avaliações não iniciadas). | (até C++11)
---|---
1) Acessos (leituras e escritas) a objetos [volatile](<#/doc/language/cv>) ocorrem estritamente de acordo com a semântica das expressões nas quais eles ocorrem. Em particular, eles [não são reordenados](<#/doc/atomic/memory_order>) em relação a outros acessos volatile na mesma thread. | (desde C++11)

2) Na terminação do programa, os dados escritos em arquivos são exatamente como se o programa tivesse sido executado conforme escrito.

3) O texto de prompt que é enviado para dispositivos interativos será exibido antes que o programa aguarde por entrada.

4) Se o pragma ISO C [` #pragma STDC FENV_ACCESS`](<#/doc/preprocessor/impl>) for suportado e estiver definido como `ON`, as alterações no [ambiente de ponto flutuante](<#/doc/numeric/fenv>) (exceções de ponto flutuante e modos de arredondamento) são garantidas de serem observadas pelos operadores aritméticos de ponto flutuante e chamadas de função como se executadas conforme escrito, exceto que

  * o resultado de qualquer expressão de ponto flutuante que não seja cast e atribuição pode ter um range e precisão de um tipo de ponto flutuante diferente do tipo da expressão (veja [FLT_EVAL_METHOD](<#/doc/types/climits/FLT_EVAL_METHOD>)),
  * não obstante o acima, resultados intermediários de qualquer expressão de ponto flutuante podem ser calculados como se tivessem range e precisão infinitos (a menos que [` #pragma STDC FP_CONTRACT`](<#/doc/preprocessor/impl>) esteja `OFF`).

### Notas

Como o compilador é (geralmente) incapaz de analisar o código de uma biblioteca externa para determinar se ela realiza ou não I/O ou acesso volatile, as chamadas de bibliotecas de terceiros também não são afetadas pela otimização. No entanto, as chamadas da standard library podem ser substituídas por outras chamadas, eliminadas ou adicionadas ao programa durante a otimização. O código de bibliotecas de terceiros linkadas estaticamente pode estar sujeito à otimização em tempo de linkagem.

Programas com [comportamento indefinido](<#/doc/language/ub>), por exemplo, devido a acesso a um array fora dos limites, modificação de um objeto const, violações da [ordem de avaliação](<#/doc/language/eval_order>), etc., estão livres da regra "as-if": eles frequentemente alteram o comportamento observável quando recompilados com diferentes configurações de otimização. Por exemplo, se um teste para overflow de inteiro com sinal depende do resultado desse overflow, por exemplo, if (n + 1 < n) abort();, [ele é completamente removido por alguns compiladores](<https://blog.llvm.org/2011/05/what-every-c-programmer-should-know_14.html>) porque [overflow de inteiro com sinal é comportamento indefinido](<#/doc/language/operator_arithmetic>) e o otimizador é livre para assumir que isso nunca acontece e que o teste é redundante.

[Copy elision](<#/doc/language/copy_elision>) é uma exceção à regra "as-if": o compilador pode remover chamadas para construtores de move e copy e as chamadas correspondentes para os destrutores de objetos temporários, mesmo que essas chamadas tenham efeitos colaterais observáveis.

```cpp
New-expression tem outra exceção à regra "as-if": o compilador pode remover chamadas para as funções de alocação substituíveis, mesmo que uma substituição definida pelo usuário seja fornecida e tenha efeitos colaterais observáveis.  // (desde C++14)
```

A contagem e a ordem das exceções de ponto flutuante podem ser alteradas pela otimização, desde que o estado observado pela próxima operação de ponto flutuante seja como se nenhuma otimização tivesse ocorrido:
```cpp
    #pragma STDC FENV_ACCESS ON
    for (i = 0; i < n; ++i)
        x + 1; // x + 1 é código morto, mas pode levantar exceções FP
               // (a menos que o otimizador possa provar o contrário). No entanto, executá-lo n vezes
               // levantará a mesma exceção repetidamente. Então isso pode ser otimizado para:
    if (0 < n)
        x + 1;
```

### Exemplo

Execute este código
```cpp
    int& preinc(int& n) { return ++n; }
    int add(int n, int m) { return n + m; }
    
    // volatile input to prevent constant folding
    volatile int input = 7;
    
    // volatile output to make the result a visible side-effect
    volatile int result;
    
    int main()
    {
        int n = input;
    // using built-in operators would invoke undefined behavior
    //  int m = ++n + ++n;
    // but using functions makes sure the code executes as-if 
    // the functions were not overlapped
        int m = add(preinc(n), preinc(n));
        result = m;
    }
```

Saída:
```
    # full code of the main() function as produced by the GCC compiler
    # x86 (Intel) platform:
            movl    input(%rip), %eax   # eax = input
            leal    3(%rax,%rax), %eax  # eax = 3 + eax + eax
            movl    %eax, result(%rip)  # result = eax
            xorl    %eax, %eax          # eax = 0 (the return value of main())
            ret
    
    # PowerPC (IBM) platform:
            lwz 9,LC..1(2)
            li 3,0          # r3 = 0 (the return value of main())
            lwz 11,0(9)     # r11 = input;
            slwi 11,11,1    # r11 = r11 << 1;
            addi 0,11,3     # r0 = r11 + 3;
            stw 0,4(9)      # result = r0;
            blr
    
    # Sparc (Sun) platform:
            sethi   %hi(result), %g2
            sethi   %hi(input), %g1
            mov     0, %o0                 # o0 = 0 (the return value of main)
            ld      [%g1+%lo(input)], %g1  # g1 = input
            add     %g1, %g1, %g1          # g1 = g1 + g1
            add     %g1, 3, %g1            # g1 = 3 + g1
            st      %g1, [%g2+%lo(result)] # result = g1
            jmp     %o7+8
            nop
    
    # em todos os casos, os efeitos colaterais de preinc() foram eliminados, e a
    # função main() inteira foi reduzida ao equivalente de result = 2 * input + 3;
```

### Veja também

  * [copy elision](<#/doc/language/copy_elision>)

[Documentação C](<#/>) para a regra "as-if"
---
  * [Value]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso dado.
  * [Std]: Standard no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão